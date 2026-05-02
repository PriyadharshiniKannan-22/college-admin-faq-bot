from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings

def create_vectorstore(docs):
    embeddings = OpenAIEmbeddings()
    db = FAISS.from_documents(docs, embeddings)
    return db