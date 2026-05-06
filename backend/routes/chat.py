from fastapi import APIRouter, Request
from pydantic import BaseModel
from services.rag_service import ask_question
from services.chat_history import save_message, get_chat_history
from auth.dependencies import get_current_user
from utils.auth import get_current_user

router = APIRouter()

class Query(BaseModel):
    query: str


@router.post("/chat")
async def chat(req: Request):
    payload = await req.json()
    query = payload["query"]

    user = await get_current_user(req)
    user_id = user["user_id"]

    # Save user message
    save_message(user_id, "user", query)

    # Get response
    result = ask_question(query, user_id)

    # Save bot response
    save_message(
        user_id,
        "assistant",
        result["answer"]
    )

    return result

@router.get("/chat/history")
async def chat_history(req: Request):
    user = await get_current_user(req)
    user_id = user["user_id"]

    history = get_chat_history(user_id)

    return {"messages": history}