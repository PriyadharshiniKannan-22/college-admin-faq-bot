import os
from utils.vectorstore import load_db
from langchain_google_genai import ChatGoogleGenerativeAI

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=os.getenv("GOOGLE_API_KEY")
)


def ask_question(query: str):
    # Load DB once 
    db = load_db()

    relevant_docs = db.similarity_search(query, k=4)

    print("\n🔎 Retrieved Docs:")
    for i, d in enumerate(relevant_docs):
        print(f"{i+1}. {d.page_content[:150]}\n")

    context = "\n\n".join(
        doc.page_content for doc in relevant_docs if doc.page_content
    )

    if not context.strip():
        return "I’m not sure. Please contact the admin office."

    prompt = f"""
    You are a college assistant bot.

    Answer ONLY using the context below.
    If the answer is not in context, say:
    "I’m not sure. Please contact the admin office."

    Context:
    {context}

    Question:
    {query}
    """

    response = llm.invoke(prompt)
    return response.content