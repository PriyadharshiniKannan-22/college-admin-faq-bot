import axios from "axios";
import { useAuth } from "@clerk/nextjs";

const API = "http://127.0.0.1:8000";

export const sendMessage = async (query: string, token: string) => {
  const res = await axios.post(
    `${API}/chat`,
    { query },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const uploadFile = async (file: File, getToken: any) => {
  const token = await getToken({ template: "rbac" });

  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};