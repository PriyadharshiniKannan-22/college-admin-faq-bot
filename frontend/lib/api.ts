import axios from "axios";

const API = "http://127.0.0.1:8000";

export const sendMessage = async (
  query: string,
  sessionId: string,
  token: string
  ) => {
    const res = await axios.post(
      `${API}/chat`,
      {
        query,
        session_id: sessionId,
      },
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

export const getChatHistory = async (
  sessionId: string,
  token: string
) => {
  const res = await axios.get(
    `${API}/chat/history/${sessionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const createSession = async (token: string) => {
  const res = await axios.post(
    `${API}/chat/session/create`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getSessions = async (token: string) => {
  const res = await axios.get(`${API}/chat/sessions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getSessionHistory = async (
  token: string,
  sessionId: string
) => {
  const res = await axios.get(
    `${API}/chat/history/${sessionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.messages;
};