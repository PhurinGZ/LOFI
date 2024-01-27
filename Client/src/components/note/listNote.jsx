// ListNote.js
import React, { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
import { useNoteContext } from "../../context/noteContext";
import { useAuth } from "../../context/authContext";
import Tooltip from "@mui/material/Tooltip";
import "./styles.scss";
import MyEditor from "./editor";
import NoteUnverifyEmail from "./noteUnverifyEmail";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, deleteNote } from "../../actions/user";

const ListNote = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const [dateTime, setDateTime] = useState(null);

  const notes = useSelector((state) => state.note.notes);

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

        await dispatch(deleteNote(user.data._id, editorId));
        setLoading(false);
      } catch (error) {
        console.error("Error deleting note:", error);
        setLoading(false);
        setError("Error deleting note.");
      }
    },
    [user, dispatch]
  );

  const fetchUserNotes = useCallback(() => {
    if (user && user.data && user.data._id) {
      dispatch(fetchNotes(user.data._id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    fetchUserNotes();

    // Fetch notes every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchUserNotes, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchUserNotes]);

  const handleCloseModal = () => setOpenModal(false);

  const handleOpenModal = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/?auth=login");
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
      event.stopPropagation();

      await deleteContent(id);
      setDateTime(null);
      setId(null);
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
              {Array.isArray(notes) ? (
                user && !user.data.isVerified ? (
                  <NoteUnverifyEmail />
                ) : notes.length === 0 ? (
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
                    {notes.map((note) => (
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
                    total {notes.length}
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
      {isModalOpen && (
        <MyEditor
          isModalOpen={isModalOpen}
          handleClose={closeModalEdit}
          dateTime={dateTime}
          editorId={id}
        />
      )}
    </>
  );
};

export default ListNote;
