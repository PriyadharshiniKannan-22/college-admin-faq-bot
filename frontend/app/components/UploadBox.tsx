"use client";

import { useState } from "react";
import { uploadFile } from "../../lib/api";

export default function UploadBox() {
  const [status, setStatus] = useState("");

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setStatus("Uploading...");

    try {
      await uploadFile(file);
      setStatus("Uploaded ✔");
    } catch (err) {
      setStatus("Upload failed ❌");
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-xl">
      <input type="file" onChange={handleUpload} />
      <p className="text-sm mt-2">{status}</p>
    </div>
  );
}