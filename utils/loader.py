import json
import os
from langchain_core.documents import Document

def load_all_data():
    docs = []

    #Load only faq.json for RAG.
    with open("data/json/faq.json") as f:
        data = json.load(f)
        for item in data:
            text = f"Q: {item['question']}\nA: {item['answer']}"
            docs.append(Document(page_content=text, metadata={"type": "faq"}))
    
    #Load all text files for RAG.
    text_folder = "data/text"
    for filename in os.listdir(text_folder):
        if filename.endswith(".txt"):
            with open(os.path.join(text_folder, filename), "r", encoding="utf-8") as f:
                content = f.read().strip()

                if content:
                    docs.append(Document(
                        page_content=content,
                        metadata={"source": filename}
                    ))

    print(f"Loaded docs: {len(docs)}")
    return docs
