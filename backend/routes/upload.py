from fastapi import APIRouter, UploadFile, File, Depends
import os

from utils.loader import load_all_data
from utils.splitter import split_documents
from utils.vectorstore import rebuild_db
from utils.auth import get_current_user, require_admin

from auth.dependencies import require_admin

router = APIRouter()

UPLOAD_DIR = "data/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload(
    file: UploadFile = File(...),
    user=Depends(require_admin)
):
    require_admin(user)

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Reload + rebuild DB
    docs = load_all_data()
    chunks = split_documents(docs)
    rebuild_db(chunks)
    
    return {"message": "File uploaded and knowledge base updated"}