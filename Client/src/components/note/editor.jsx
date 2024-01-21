// MyEditor.js

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { useNoteContext } from "../../context/noteContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MyEditor = ({ isOpen, handleClose, editorId, dataTime }) => {
  const { state, dispatch } = useNoteContext();
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

      dispatch({ type: "ADD_NOTE", payload: response.data });
      setResponseMessage(response.data.message);
      console.log("Server response:", response.data);
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
      if (!user || !user.data || !user.data.id) {
        setResponseMessage("User not found");
      }
      const response = await axios.post(
        `${BASE_URL}/api/editor/save-content`,
        { content: editorHtml, title: title, userId: user.data._id },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      setResponseMessage(response.data.message);
      console.log("Server response:", response.data);

      if (response.data.success) {
        setEditorHtml("");
        setTitle("");
        handleClose(); // Close the modal
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400 && data.message === "no token") {
          setResponseMessage("No token provided. Please log in and try again.");
        } else {
          setResponseMessage(`Error : ${data.message}`);
        }
      } else if (error.request) {
        setResponseMessage(
          "No response from the server. Please try again later."
        );
      } else {
        setResponseMessage("Unexpected error. Please try again.");
      }

      console.error("Error saving content:", error);
    }
  };

  const handleSaveClick = () => {
    saveContentToBackend();
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "500px",
    display: isOpen ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  const contentStyle = {
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 20px rgba(0, 0, 0, 0.2)",
    maxWidth: "600px",
    width: "100%",
  };

  const headerStyle = {
    textAlign: "start",
    marginBottom: "15px",
    fontSize: "1.5em",
    color: "#333",
  };

  const inputStyle = {
    width: "30%",
    marginBottom: "15px",
    padding: "10px",
    fontSize: "1em",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box",
  };

  const quillStyle = {
    width: "339px",
    height: "338px",
    flexShrink: 0,
  };

  const buttonStyle = {
    width: "61px",
    height: "22px",
    flexShrink: 0,
    borderRadius: "10px",
    background: "#BB98FF",
    boxShadow: "3px 1px 3.7px 0px rgba(0, 0, 0, 0.25)",
  };

  const responseStyle = {
    marginTop: "20px",
    color: responseMessage.includes("success") ? "green" : "red",
    textAlign: "center",
  };

  const ArrowBack = {
    cursor: "pointer",
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
    <div style={modalStyle}>
      <div style={contentStyle} className="contentEditor">
        <div style={headerStyle}>
          <ArrowBackIcon
            onClick={handleClose}
            color="secondary"
            variant="contained"
            style={ArrowBack}
          >
            Close
          </ArrowBackIcon>
          <h2>Note Editor</h2>
        </div>
        <div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter title"
            style={inputStyle}
          />
          <p>{dataTime}</p>
        </div>
        <ReactQuill
          theme="snow"
          value={editorHtml}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
          placeholder="Write something..."
          style={quillStyle}
        />
        <div
          style={{
            marginTop: "25%",
            justifyContent: "flex-end",
            display: "flex",
          }}
        >
          <Button
            onClick={handleSaveClick}
            color="primary"
            variant="contained"
            style={buttonStyle}
          >
            Save
          </Button>
        </div>

        {responseMessage && <div style={responseStyle}>{responseMessage}</div>}
      </div>
    </div>
  );
};

export default MyEditor;
