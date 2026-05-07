from fastapi import APIRouter, Request
from pydantic import BaseModel
from services.rag_service import ask_question
from services.chat_history import (
    save_message,
    get_chat_history,
    create_chat_session,
    get_user_sessions
)
from auth.dependencies import get_current_user
from utils.auth import get_current_user

router = APIRouter()

class Query(BaseModel):
    query: str


@router.post("/")
async def chat(payload: dict, req: Request):

    user = await get_current_user(req)
    user_id = user["user_id"]

    query = payload["query"]
    session_id = payload["session_id"]

    save_message(session_id, user_id, "user", query)

    result = ask_question(query, user_id)

    save_message(
        session_id,
        user_id,
        "assistant",
        result["answer"]
    )

    return result

@router.get("/history/{session_id}")
async def chat_history(session_id: str, req: Request):

    user = await get_current_user(req)

    history = get_chat_history(session_id)

    return {
        "messages": history
    }

@router.post("/session/create")
async def create_session(req: Request):

    user = await get_current_user(req)
    user_id = user["user_id"]

    session_id = create_chat_session(user_id)

    return {
        "session_id": session_id
    }


@router.get("/sessions")
async def get_sessions(req: Request):

    user = await get_current_user(req)
    user_id = user["user_id"]

    sessions = get_user_sessions(user_id)

    return {
        "sessions": sessions
    }