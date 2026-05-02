import json
from langchain.schema import Document

def load_faq(file_path):
    with open(file_path, "r") as f:
        data = json.load(f)

    documents = []
    for item in data:
        text = f"Q: {item['question']}\nA: {item['answer']}"
        documents.append(Document(page_content=text))

    return documents