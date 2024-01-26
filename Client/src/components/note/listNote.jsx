// ListNote.js

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Draggable from "react-draggable";
import { useNavigate } from 'react-router-dom';
import { useNoteContext } from "../../context/noteContext";
import { useAuth } from "../../context/authContext";
import Tooltip from "@mui/material/Tooltip";
import "./styles.scss";
import MyEditor from "./editor";
import NoteUnverifyEmail from "./noteUnverifyEmail";

const ListNote = () => {
  const { state, dispatch } = useNoteContext();
  const { user } = useAuth();
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:8000";
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState();
  const [dateTime, setDateTime] = useState();

  const deleteContent = useCallback(
    async (editorId) => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          console.error("Authentication token not found.");
          setError("Authentication token not found.");
          return;
        }

        if (!user || !user.data || !user.data._id) {
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
    },
    [user, dispatch]
  );

  const fetchNotes = useCallback(async () => {
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
        return;
      }

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
  }, [user, dispatch, state.notes]);

  useEffect(() => {
    if (Array.isArray(state.notes)) {
      fetchNotes();
    }
  }, [fetchNotes]);

  useEffect(() => {
    if (id !== null && dateTime !== null) {
      // setDateTime("");
      // setId("");
    } else {
      if (id === null && dateTime === null) {
        setIsModalOpen(false);
        setDateTime("");
        setId("");
      }
    }
  }, [id, dateTime]);

  const handleCloseModal = () => setOpenModal(false);

  const handleOpenModal = () => {
    // ตรวจสอบว่าผู้ใช้เข้าสู่ระบบหรือไม่
    if (user) {
      setOpenModal(true);
    } else {
      // ถ้ายังไม่ได้เข้าสู่ระบบ ให้ทำการ Redirect ไปยังหน้า login
      // หรือแสดง component login ตามที่คุณต้องการ
      navigate("/?auth=login"); // ใช้ useNavigate ทำการ redirect
    }
  };

  const openModalEdit = () => setIsModalOpen(true);

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

  const handleDelete = async (id, event) => {
    try {
      // Prevent event propagation
      event.stopPropagation();

      await deleteContent(id);
      setDateTime("");
      setId("");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <>
      <Tooltip title="Note" placement="right-start">
        <button onClick={handleOpenModal} className="img-icon-category">
          <img src="/assets/icons/notes.png" alt="" />
        </button>
      </Tooltip>
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
              {error && <p className="error-message">{error}</p>}
              {Array.isArray(state.notes) ? (
                user && !user.data.isVerified ? (
                  <NoteUnverifyEmail />
                ) : state.notes.length === 0 ? (
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
                        onClick={() =>
                          handleClickEdit(note._id, note.createdAt)
                        }
                      >
                        <div className="Title">
                          <h1>Title</h1>
                          <p>{note.title}</p>
                        </div>
                        <div className="Date">
                          <h1>Date</h1>
                          <p>
                            {new Date(note.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </p>
                        </div>
                        <div className="delete">
                          <div style={{ width: "20px", height: "23px" }}>
                            <Tooltip title="Delete" placement="right-start">
                              <img
                                src="/assets/icons/delete.png"
                                alt=""
                                onClick={(event) =>
                                  handleDelete(note._id, event)
                                }
                              />
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <></>
                // <p>Error loading notes</p>
              )}
              {user && user.data.isVerified && (
                <>
                  <p
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "10px",
                      color: "#3d3d3d",
                    }}
                  >
                    {" "}
                    total {state.notes.length}
                  </p>
                  <div className="write">
                    <img
                      onClick={openModalEdit}
                      src="/assets/icons/pen.png"
                      alt=""
                    />
                  </div>
                </>
              )}
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
