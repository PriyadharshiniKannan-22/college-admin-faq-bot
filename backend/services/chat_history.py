from pymongo import MongoClient
import os
from datetime import datetime, timezone

client = MongoClient(os.getenv("MONGO_URI"))

db = client["college_bot"]
collection = db["chat_history"]

def save_message(user_id, role, content):
    collection.insert_one({
        "user_id": user_id,
        "role": role,
        "content": content,
        "timestamp": datetime.now(timezone.utc)
    })

def get_chat_history(user_id):
    messages = collection.find(
        {"user_id": user_id}
    ).sort("timestamp", 1)

    return [
        {
            "role": msg["role"],
            "content": msg["content"],
        }
        for msg in messages
    ]