import os
from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings

CHROMA_PATH = "chroma"


def get_embeddings():
    api_key = os.getenv("GOOGLE_API_KEY")

    if not api_key:
        raise ValueError("GOOGLE_API_KEY not found in environment")

    return GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001",
        google_api_key=api_key
    )


def load_db():
    embeddings = get_embeddings()

    return Chroma(
        persist_directory=CHROMA_PATH,
        embedding_function=embeddings
    )


def add_to_db(docs):
    embeddings = get_embeddings()

    db = Chroma(
        persist_directory=CHROMA_PATH,
        embedding_function=embeddings
    )

    texts = []
    metadatas = []

    for d in docs:
        text = d.page_content.strip()
        if len(text) < 10:
            continue
        texts.append(text)
        metadatas.append(d.metadata)

    if texts:
        db.add_texts(texts=texts, metadatas=metadatas)

    return db