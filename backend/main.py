from langchain.chains import RetrievalQA
from langchain.llms import OpenAI

def build_qa(db):
    retriever = db.as_retriever()
    qa = RetrievalQA.from_chain_type(
        llm=OpenAI(),
        retriever=retriever
    )
    return qa