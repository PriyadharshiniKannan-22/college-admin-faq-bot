from fastapi import APIRouter, UploadFile, File
import os
from services.ingestion_service import process_file_and_store

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    process_file_and_store(file_path)

    return {"message": "Uploaded successfully"}