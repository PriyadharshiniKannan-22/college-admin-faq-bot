from fastapi import APIRouter
from pydantic import BaseModel
from services.rag_service import ask_question

router = APIRouter()

class Query(BaseModel):
    query: str


@router.post("/chat")
def chat(data: Query):
    answer = ask_question(data.query)
    return {"answer": answer}