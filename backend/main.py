from dotenv import load_dotenv
import os
import shutil

from utils.loader import load_all_data
from utils.splitter import split_documents
from utils.vectorstore import create_db

from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

CHROMA_PATH = "chroma"

if os.path.exists(CHROMA_PATH):
    shutil.rmtree(CHROMA_PATH)

# Build pipeline ONCE
docs = load_all_data()
chunks = split_documents(docs)
db = create_db(chunks)

llm = ChatGoogleGenerativeAI(
    model="models/gemini-2.5-flash",   # or "gemini-1.5-pro" for embedding support
    google_api_key=os.getenv("GOOGLE_API_KEY")
)

def ask_question(query):
    # Retrieve docs from DB
    relevant_docs = db.similarity_search(query, k=4)

    print("\n🔎 Retrieved Docs:")
    for i, doc in enumerate(relevant_docs):
        print(f"{i+1}. {doc.page_content[:200]}\n")

    context = "\n\n".join(
        doc.page_content for doc in relevant_docs if doc.page_content
    )

    if not context.strip():
        return "I don't know"

    prompt = f"""
    You are a helpful college assistant bot.

    Use the context below to answer the question.
    If the answer is partially available, try to infer it carefully.
    Only say "I don't know" if absolutely no relevant information exists.

    Context:
    {context}

    Question:
    {query}
    """

    response = llm.invoke(prompt)
    return response.content