// api/axios.js
import axios from "axios";

const BASE_URL = "http://localhost:8000";

const token = localStorage.getItem("token");

export const getContent = (userId, editorId) =>
  axios.get(`${BASE_URL}/api/editor/get-content/${userId}/${editorId}`, {
    headers: {
      "x-auth-token": token,
    },
  });

export const saveContent = (content, title, userId) =>
  axios.post(
    `${BASE_URL}/api/editor/save-content`,
    {
      content,
      title,
      userId,
    },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );

export const getNotes = (userId) =>
  axios.get(`${BASE_URL}/api/editor/${userId}/notes`, {
    headers: {
      "x-auth-token": token,
    },
  });

export const updateContent = (content, title, userId, editorId) =>
  axios.put(
    `${BASE_URL}/api/editor/update-content/${userId}/${editorId}`,
    {
      content,
      title,
    },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );

export const deleteNotes = (userId, editorId) =>
  axios.delete(`${BASE_URL}/api/editor/delete-content/${userId}/${editorId}`, {
    headers: {
      "x-auth-token": token,
    },
  });
