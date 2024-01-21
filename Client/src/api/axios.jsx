// api/axios.js
import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getContent = (userId, editorId) =>
  axios.get(`${BASE_URL}/api/editor/get-content/${userId}/${editorId}`);

export const saveContent = (content, title, userId) =>
  axios.post(`${BASE_URL}/api/editor/save-content`, {
    content,
    title,
    userId,
  });

export const getNotes = (userId, token) =>
  axios.get(`${BASE_URL}/api/editor/${userId}/notes`, {
    headers: {
      "x-auth-token": token,
    },
  });
