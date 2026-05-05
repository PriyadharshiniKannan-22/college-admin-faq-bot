from fastapi import Depends, APIRouter
from pydantic import BaseModel
from services.rag_service import ask_question
from auth.dependencies import get_current_user

router = APIRouter()

class Query(BaseModel):
    query: str


@router.post("/chat")
async def chat(payload: dict, user=Depends(get_current_user)):
    result = ask_question(payload["query"])
    return result