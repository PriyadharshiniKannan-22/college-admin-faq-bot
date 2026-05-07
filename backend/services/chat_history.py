from pymongo import MongoClient
from datetime import datetime, timezone
import uuid
import os

client = MongoClient(os.getenv("MONGO_URI"))

db = client["college_bot"]

chat_collection = db["chat_history"]
session_collection = db["chat_sessions"]


# -----------------------------
# CREATE NEW SESSION
# -----------------------------
def create_chat_session(user_id, title="New Chat"):
    session_id = str(uuid.uuid4())

    session_collection.insert_one({
        "session_id": session_id,
        "user_id": user_id,
        "title": title,
        "created_at": datetime.now(timezone.utc)
    })

    return session_id


# -----------------------------
# GET USER SESSIONS
# -----------------------------
def get_user_sessions(user_id):
    sessions = session_collection.find(
        {"user_id": user_id}
    ).sort("created_at", -1)

    return [
        {
            "session_id": s["session_id"],
            "title": s["title"]
        }
        for s in sessions
    ]


# -----------------------------
# SAVE MESSAGE
# -----------------------------
def save_message(session_id, user_id, role, content):
    chat_collection.insert_one({
        "session_id": session_id,
        "user_id": user_id,
        "role": role,
        "content": content,
        "timestamp": datetime.now(timezone.utc)
    })


# -----------------------------
# GET CHAT HISTORY
# -----------------------------
def get_chat_history(session_id):
    messages = chat_collection.find(
        {"session_id": session_id}
    ).sort("timestamp", 1)

    return [
        {
            "role": msg["role"],
            "content": msg["content"]
        }
        for msg in messages
    ]