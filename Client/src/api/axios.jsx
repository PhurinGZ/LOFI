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

export const forgetPassword = (email) =>
  axios.post(
    `${BASE_URL}/api/users/forget-password`,
    { email },
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    }
  );

export const login = (formData) =>
  axios.post(`${BASE_URL}/api/login`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const register = (formData) =>
  axios.post(`${BASE_URL}/api/users`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const resetPassword = (newPassword, token) =>
  axios.post(
    `${BASE_URL}/api/users/reset-password/${token}`,
    { newPassword }, // Send newPassword as an object
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  export const verifyEmail = async (emailToken) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/verify-email`,
        { emailToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data; // Return the data for successful response
    } catch (error) {
      throw error.response?.data; // Throw the error response for unsuccessful response
    }
  };
  
  export const getUserData = (userId) =>
  axios.get(`${BASE_URL}/api/users/${userId}`, {
    headers: {
      "x-auth-token": token,
    },
  });

  export const updatePassword = (userId, passwordForm) =>
  axios.put(
    `${BASE_URL}/api/users/${userId}`,
    {
      password: passwordForm.newPassword,
      oldPassword: passwordForm.currentPassword,
    },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );

  export const resendVerificationEmail = (email) =>
  axios.post(
    `${BASE_URL}/api/users/resend-verification`,
    {
      email: email,
    },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );