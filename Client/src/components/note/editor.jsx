// MyEditor.js

import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useAuth } from "../../context/authContext";
import { useNoteContext } from "../../context/noteContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Draggable from "react-draggable";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as noteActions from "../../actions/user"; // Updated import
import { useMediaQuery } from "@mui/material";

import "./styles.scss";

const MyEditor = ({ isModalOpen, handleClose, editorId, dateTime }) => {
  const { user } = useAuth();
  const { state } = useNoteContext();
  const [editorHtml, setEditorHtml] = useState("");
  const [title, setTitle] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [isDraggable, setIsDraggable] = useState(!isSmallScreen);

  const dispatch = useDispatch(); // Use useDispatch to get the dispatch function

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        if (user && user.data && user.data._id) {
          const userData = user.data;
          const response = await dispatch(
            noteActions.fetchContent(userData._id, editorId)
          );
          // console.log(response)
          const data = response;
          // console.log(data.content);
          if (isMounted) {
            setEditorHtml(data.content);
            setTitle(data.title);
          }
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    if (editorId && isModalOpen) {
      fetchContent();
    }

    return () => {
      isMounted = false;
    };
  }, [user, editorId, isModalOpen]);

  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSaveClick = async () => {
    try {
      const response = await dispatch(
        noteActions.saveContent(editorHtml, title, user.data._id)
      ); // Dispatch saveContent action
      setResponseMessage(response.message);
      // console.log("Server response:", response);

      if (response.success) {
        alert("Save successful.");
        setEditorHtml("");
        setTitle("");
        handleClose(); // Close the modal
      } else {
        alert("Save unsuccessful!!. Please try again.");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      setResponseMessage("Error saving content");
    }
  };

  const handleUpdateClick = async () => {
    try {
      const response = await dispatch(
        noteActions.updateContent(editorHtml, title, user.data._id, editorId)
      ); // Dispatch updateContent action
      setResponseMessage(response.message);
      // console.log("Server response:", response);

      if (response.success) {
        alert("Update successful.");
        setEditorHtml("");
        setTitle("");
        handleClose(); // Close the modal
      } else {
        alert("Update unsuccessful!!. Please try again.");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      setResponseMessage("Error updating content");
    }
  };

  const handleCloseModal = () => {
    setTitle("");
    setEditorHtml("");
    handleClose();
  };

  const handleAxiosError = (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400 && data.message === "no token") {
        setResponseMessage("No token provided. Please log in and try again.");
      } else {
        setResponseMessage(`Error: ${data.message}`);
      }
    } else if (error.request) {
      setResponseMessage(
        "No response from the server. Please try again later."
      );
    } else {
      setResponseMessage("Unexpected error. Please try again.");
    }

    console.error("Error saving content:", error);
  };

  const modalStyle = {
    padding: "15px",
    position: "absolute",
    maxWidth: "1246px",
    maxHeight: "710px",
    minWidth: "500px",
    minHeight: "500px",
    resize: "both",
    overflow: "hidden",
    display: isModalOpen ? "flex" : "none",
  };

  const contentStyle = {
    borderRadius: "8px",
    width: "100%",
    minHeight: "fit-content",
    display: "flex",
    flexDirection: "column",
  };

  const headerStyle = {
    marginTop: "0px",
    textAlign: "start",
    fontSize: "1.5em",
    color: "#333",
    // marginTop: "5%",
    cursor: "move",
  };

  const inputStyle = {
    width: "40%",
    marginBottom: "15px",
    padding: "10px",
    fontSize: "1em",
    border: "1px solid #BB98FF",
    borderRadius: "5px",
    boxSizing: "border-box",
    outline: "none",
  };

  const quillStyle = {
    ".ql-container.ql-snow": {
      border: "none",
    },
    ".ql-snow .ql-editor": {
      border: "none",
      height: "300px",
      width: "100%",
    },
    // width: "339px",
    // height: "338px",
    // flexShrink: 0,
    // border: "none",
  };

  const buttonStyle = {
    width: "61px",
    height: "22px",
    flexShrink: 0,
    borderRadius: "10px",
    background: "#BB98FF",
    boxShadow: "3px 1px 3.7px 0px rgba(0, 0, 0, 0.25)",

    bottom: "0",
  };

  const responseStyle = {
    marginTop: "20px",
    color: responseMessage.includes("success") ? "green" : "red",
    textAlign: "center",
  };

  const ArrowBack = {
    cursor: "pointer",
    position: "absolute",
    left: "1%",
  };

  if (window.matchMedia("(max-width: 768px)").matches) {
    modalStyle.minWidth = "280px";
    modalStyle.maxWidth = "280px";
    contentStyle.maxWidth = "100%";
    modalStyle.maxHeight = "500px";
    modalStyle.minHeight = "500px";
  }

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
      [{ color: [] }],
      [{ background: [] }], // เพิ่มปุ่มปากกาไฮไลท์
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
    "color",
    "background",
  ];

  // const dateTime = new Date().toISOString();
  // console.log("Original Date:", dateTime);

  // if (!dateTime) {
  //   console.error("DateTime is null or undefined");
  // }

  const formattedDateTime = dateTime
    ? new Date(dateTime).toLocaleString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    : new Date().toLocaleString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

  // console.log("Formatted Date:", formattedDateTime);
  // console.log(editorId)

  return (
    <Draggable disabled={isSmallScreen || !isDraggable} handle=".header">
      <div style={modalStyle} className="contentEditor">
        <div style={contentStyle}>
          <div style={headerStyle} className="header">
            <ArrowBackIcon
              onClick={handleCloseModal}
              color="secondary"
              variant="contained"
              style={ArrowBack}
            >
              Close
            </ArrowBackIcon>
            <h1 style={{ display: "flex", justifyContent: "center" }}>
              Note Editor
            </h1>
          </div>
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter title"
              style={inputStyle}
            />
            <p style={{ padding: "10px", marginBottom: "10px" }}>
              {formattedDateTime}
            </p>
          </div>
          <ReactQuill
            theme="snow"
            value={editorHtml}
            onChange={handleEditorChange}
            modules={modules}
            formats={formats}
            placeholder="Write something..."
            style={quillStyle}
            className="custom-quill-editor"
          />

          <div
            style={{
              marginTop: "10px",
              justifyContent: "flex-end",
              display: "flex",
              height: "fit-content",
            }}
          >
            {editorId ? (
              <Button
                onClick={handleUpdateClick}
                color="primary"
                variant="contained"
                style={buttonStyle}
              >
                Update
              </Button>
            ) : (
              <Button
                onClick={handleSaveClick}
                color="primary"
                variant="contained"
                style={buttonStyle}
              >
                Save
              </Button>
            )}
          </div>

          {responseMessage && (
            <div style={responseStyle}>{responseMessage}</div>
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default MyEditor;
