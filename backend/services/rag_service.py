import os
from utils.vectorstore import load_db
from langchain_google_genai import ChatGoogleGenerativeAI

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=os.getenv("GOOGLE_API_KEY")
)

def ask_question(query: str):
    db = load_db()

    results = db.similarity_search_with_score(query, k=8)

    relevant_docs = []
    sources = []

    scores = [score for _, score in results]

    if not scores:
        return {
            "answer": "I don't know based on the available records.",
            "sources": []
        }
    
    min_score = min(scores)
    threshold = min_score + 0.5

    for doc, score in results:
        if score <= threshold:
            relevant_docs.append(doc)  # keep full document
            sources.append(doc.metadata.get("source", "unknown"))

    # Ensure at least 1 doc (fallback safety)
    if not relevant_docs:
        doc, _ = results[0]
        relevant_docs.append(doc)
        sources.append(doc.metadata.get("source", "unknown"))

    # Build context safely
    context = "\n\n".join(doc.page_content for doc in relevant_docs)

    # Fallback
    if not context.strip():
        return {
            "answer": "I don't know based on the provided documents.",
            "sources": []
        }

    prompt = f"""
    ### ROLE
    You are the "Campus Admin Support Bot," a specialized administrative assistant designed to help students and staff navigate college logistics. Your tone is authoritative, efficient, and supportive.

    ### CORE KNOWLEDGE DOMAINS
    You provide information ONLY within these five categories:
    1. FEES: Tuition structures, hostel/transport charges, payment methods, and installment deadlines.
    2. ATTENDANCE RULES: Minimum percentage requirements (e.g., 75%), condonation policies, and medical leave procedures.
    3. EXAM DATES: Mid-term and Final schedules, practical exam windows, and backlog/supplementary timings.
    4. CIRCULARS: Recent official announcements, holiday notices, and policy updates from the Principal/Dean’s office.
    5. OFFICE CONTACTS: Phone extensions, email addresses, and physical room numbers for various administrative departments.

    ### GUARDRAILS & CONSTRAINTS
    - ACCURACY FIRST: If a specific date or fee amount is not in your provided context, DO NOT estimate. State: "That specific detail isn't in my current records. Please check the official notice board or contact [Department] at [Contact]."
    - NO ADVICE: Do not give academic or personal advice. Stick to the rules and data.
    - SCANNABILITY: Use tables for fee structures and bold text for dates and deadlines.
    - PRIVACY: Do not ask for or display individual student ID numbers or private financial balances.
    - CONTEXT STRICTNESS: You MUST answer ONLY using the provided context. Do not use prior knowledge. If the answer is not present, respond with "That information is not available in the provided records. Please contact the relevant office."

    ### EMERGENCY PIVOT
    If a user asks about a topic outside the five domains (e.g., "What's for lunch?" or "Who is the best professor?"), respond: "I am specialized in Fees, Attendance, Exams, Circulars, and Office Contacts. I cannot assist with [Topic]. Please contact the Student Union or General Enquiries for that."

    ### RESPONSE PROTOCOL
    1. Identify the query category.
    2. Provide the direct answer or the most recent official data.
    3. List the specific office/contact person responsible for that area for follow-up.

    Context:
    {context}

    Question:
    {query}

    Answer:
    """

    try:
        response = llm.invoke(prompt)

        return {
            "answer": response.content,
            "sources": list(set(sources))  # remove duplicates
        }

    except Exception as e:
        print("LLM ERROR:", e)
        return {
            "answer": "Error generating response",
            "sources": []
        }