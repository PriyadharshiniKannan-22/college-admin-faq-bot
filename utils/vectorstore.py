import os
from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings

CHROMA_PATH = "chroma"

def create_db(chunks):
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001",
        google_api_key=os.getenv("GOOGLE_API_KEY")
    )

    # Clean chunks (prevents IndexError)
    texts = []
    metadatas = []

    for c in chunks:
        text = c.page_content.strip()
        if len(text) < 10:
            continue
        texts.append(text)
        metadatas.append(c.metadata)

    print(f"Final valid texts: {len(texts)}")

    db = Chroma.from_texts(
        texts=texts,
        embedding=embeddings,
        metadatas=metadatas,
        persist_directory=CHROMA_PATH
    )

    #db.persist()
    return db