// MyEditor.js

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const MyEditor = ({ isOpen, handleClose, editorId }) => {
  const [editorHtml, setEditorHtml] = useState("");
  const [title, setTitle] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const BASE_URL = "http://localhost:8000";
  const token = localStorage.getItem("token");
  const { user } = useAuth();

  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const fetchContent = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/editor/get-content/${user.data._id}/${editorId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      setEditorHtml(response.data.content);
      setTitle(response.data.title || "");
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  useEffect(() => {
    if (editorId) {
      fetchContent();
    }
  }, [editorId]);

  const saveContentToBackend = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/editor/save-content`,
        { content: editorHtml, title: title, _id: user.data._id },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      setResponseMessage(response.data.message);
      console.log("Server response:", response.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, data } = error.response;

        if (status === 400 && data.message === "no token") {
          setResponseMessage(
            "No token provided. Please log in and try again."
          );
        } else {
          setResponseMessage(`Error : ${data.message}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        setResponseMessage(
          "No response from the server. Please try again later."
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        setResponseMessage("Unexpected error. Please try again.");
      }

      console.error("Error saving content:", error);
    }
  };

  const handleSaveClick = () => {
    saveContentToBackend();
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>My Editor</DialogTitle>
      <DialogContent>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter title"
        />
        <ReactQuill
          theme="snow"
          value={editorHtml}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
          placeholder="Write something..."
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveClick} color="primary">
          Save
        </Button>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>

      {responseMessage && (
        <div
          style={{
            marginTop: "10px",
            color: responseMessage.includes("success") ? "green" : "red",
          }}
        >
          {responseMessage}
        </div>
      )}
    </Dialog>
  );
};

export default MyEditor;
