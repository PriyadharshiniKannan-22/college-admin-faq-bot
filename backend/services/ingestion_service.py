from utils.loader import process_uploaded_file
from utils.vectorstore import add_to_db


def process_file_and_store(file_path: str):
    """
    Handles uploaded file ingestion pipeline:
    file → text → chunks → embeddings → vector DB
    """

    docs = process_uploaded_file(file_path)

    # Directly add to existing DB (no rebuild, same behavior)
    add_to_db(docs)