import axios from "axios";

const API = "http://127.0.0.1:8000";

export const sendMessage = async (query: string, token: string | null) => {
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

export const getChatHistory = async (token: string) => {
  const res = await axios.get(`${API}/chat/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};