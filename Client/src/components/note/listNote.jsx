// ListNote.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Draggable from "react-draggable";
import { useNoteContext } from "../../context/noteContext";
import { useAuth } from "../../context/authContext";
import Tooltip from "@mui/material/Tooltip";
import "./styles.scss";
import MyEditor from "./editor";

const ListNote = () => {
  const { state, dispatch } = useNoteContext();
  const { user } = useAuth();
  const BASE_URL = "http://localhost:8000";
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState();
  const [dateTime, setDateTime] = useState();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          console.error("Authentication token not found.");
          setError("Authentication token not found.");
          return;
        }

        if (!user || !user.data || !user.data._id) {
          setLoading(false);
          // console.error("User data not available.");
          // setError("User data not available.");
          return;
        }

        // ตรวจสอบว่า state.notes เป็นอาร์เรย์
        if (!Array.isArray(state.notes)) {
          console.error("state.notes is not an array");
          setLoading(false);
          setError("Invalid state.notes data.");
          return;
        }

        const response = await axios.get(
          `${BASE_URL}/api/editor/${user.data._id}/notes`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        dispatch({ type: "SET_NOTES", payload: response.data });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setLoading(false);
        setError("Error fetching notes.");
      }
    };

    // ตรวจสอบว่า state.notes ถูกต้องก่อนที่จะเรียก fetchNotes
    if (Array.isArray(state.notes)) {
      fetchNotes();
    }
  }, [user, dispatch, state.notes]);

  useEffect(() => {
    // This useEffect will be triggered when 'id' or 'dateTime' changes
    if (id !== null && dateTime !== null) {
       
      // setDateTime("");
      // setId("");
    } else {
      // Add this condition to check if id and dateTime are both not null
      if (id === null && dateTime === null) {
        setIsModalOpen(false);
        setDateTime("");
        setId("");
      }
    }
  }, [id, dateTime]);

  const deleteContent = async (editorId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        console.error("Authentication token not found.");
        setError("Authentication token not found.");
        return;
      }

      if (
        !user ||
        !user.data ||
        user.data._id === null ||
        user.data._id === undefined
      ) {
        return;
      }

      const response = await axios.delete(
        `${BASE_URL}/api/editor/delete-content/${user.data._id}/${editorId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      dispatch({ type: "SET_NOTES", payload: response.data });
      setLoading(false);
    } catch (error) {
      console.error("Error deleting note:", error);
      setLoading(false);
      setError("Error deleting note.");
    }
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  if (loading) {
    return <p>Loading notes...</p>;
  }

  const openModalEdit = () => {
    setIsModalOpen(true);
  };

  const closeModalEdit = () => {
    setIsModalOpen(false);
    setDateTime(null);
    setId(null);
  };

  const handleClickEdit = (id, dateTime) => {
    setIsModalOpen(true);
    setDateTime(dateTime);
    setId(id);
  };

  const handleDelete = (id) => {
    deleteContent(id);
    setDateTime("");
    setId("");
    // console.log(id);
  };

  // console.log("id : ", id);
  // console.log("date : ", dateTime);

  // console.log(state);

  return (
    <>
      <button onClick={handleOpenModal} className="img-icon-category">
        <img src="/assets/icons/notes.png" alt="" />
      </button>
      {openModal && (
        <div className="main">
          <Draggable handle=".title">
            <div className="custom-dialog">
              <div className="title">
                <h1>List of Notes </h1>
                <Button onClick={handleCloseModal} color="primary">
                  Close
                </Button>
              </div>
              {error ? <p className="error-message">{error}</p> : null}
              {Array.isArray(state.notes) ? (
                state.notes.length === 0 ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "70%",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "2rem",
                        color: "#3D3D3D",
                        opacity: "0.3",
                      }}
                    >
                      No notes available....
                    </p>
                  </div>
                ) : (
                  <div className="maincontent">
                    {state.notes.map((note) => (
                      <div
                        key={note._id}
                        className="content"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className="Title"
                          onClick={() =>
                            handleClickEdit(note._id, note.createdAt)
                          }
                        >
                          <h1>Title</h1>
                          <p>{note.title}</p>
                        </div>
                        <div
                          className="Date"
                          onClick={() =>
                            handleClickEdit(note._id, note.createdAt)
                          }
                        >
                          <h1>Date</h1>
                          <p>
                            {new Date(note.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </p>
                        </div>

                        <div className="delete">
                          <div
                            style={{
                              width: "20px",
                              height: "23px",
                            }}
                          >
                            <Tooltip title="Delete" placement="right-start">
                              <img
                                src="/assets/icons/delete.png"
                                alt=""
                                onClick={() => handleDelete(note._id)}
                              />
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <p>Error loading notes</p>
              )}
              <p style={{position:"absolute",bottom:"10px", left:"10px",color:"#3d3d3d"}}> total { state.notes.length}</p>
              <div className="write">
                <img
                  onClick={() => openModalEdit()}
                  src="/assets/icons/pen.png"
                  alt=""
                />
              </div>
            </div>
          </Draggable>
        </div>
      )}

      <div className="Editor">
        <MyEditor
          isOpen={isModalOpen}
          handleClose={closeModalEdit}
          editorId={id}
          dateTime={dateTime}
        />
      </div>
    </>
  );
};

export default ListNote;
