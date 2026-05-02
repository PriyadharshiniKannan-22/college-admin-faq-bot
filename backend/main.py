from utils.loader import load_faq
from utils.splitter import split_docs
from utils.vectorstore import create_vectorstore
from backend.qa_chain import build_qa

docs = load_faq("data/faq.json")
split_docs = split_docs(docs)
db = create_vectorstore(split_docs)
qa = build_qa(db)

def ask_question(query):
    return qa.run(query)