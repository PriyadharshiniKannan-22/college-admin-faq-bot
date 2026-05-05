"use client";

import { useState } from "react";
import { uploadFile } from "../../lib/api";
import { useAuth } from "@clerk/nextjs";

export default function UploadBox() {
  const { getToken } = useAuth();

  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    try {
      await uploadFile(file, getToken);
      alert("Uploaded successfully");
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div className="mb-4">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded">
        Upload
      </button>
    </div>
  );
}