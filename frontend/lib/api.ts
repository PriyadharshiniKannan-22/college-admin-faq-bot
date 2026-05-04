import axios from "axios";

const API = "http://127.0.0.1:8000";

export const sendMessage = async (query: string) => {
  const res = await axios.post(`${API}/chat`, { query });
  return res.data.answer;
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};