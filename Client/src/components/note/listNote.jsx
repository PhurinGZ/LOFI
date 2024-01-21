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
  const [isModalOpen, setIsModalOpen] = useState(false); // Move isModalOpen state to the top
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

        if (
          !user ||
          !user.data ||
          user.data._id === null ||
          user.data._id === undefined
        ) {
          // setLoading(false);
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

        // Update the notes in the context
        dispatch({ type: "SET_NOTES", payload: response.data });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setLoading(false);
        setError("Error fetching notes.");
      }
    };

    fetchNotes();
  }, [user, dispatch]);

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
    setDateTime(null); // Reset dateTime to initial state
    setId(null); // Reset id to initial state
  };

  const handleClickEdit = (id, dateTime) => {
    setIsModalOpen(true);
    setDateTime(dateTime);
    setId(id);
  };

  console.log("id : ", id);
  console.log("date : ", dateTime);

  return (
    <>
      {/* Button to open modal */}
      <button onClick={handleOpenModal} className="img-icon-category">
        <img src="/assets/icons/notes.png" alt="" />
      </button>

      {/* Modal */}
      {openModal && (
        <div className="main">
          {" "}
          <Draggable handle=".title">
            <div className="custom-dialog">
              <div className="title">
                {" "}
                <h1>List of Notes </h1>
                <Button onClick={handleCloseModal} color="primary">
                  Close
                </Button>
              </div>
              {error ? <p className="error-message">{error}</p> : null}
              {state.notes.length === 0 ? (
                <p>No notes available.</p>
              ) : (
                <div className="maincontent">
                  {" "}
                  {state.notes.map((note) => (
                    <div
                      key={note._id}
                      className="content"
                      onClick={() => handleClickEdit(note._id, note.createdAt)} // Fix the onClick handler
                      style={{ cursor: "pointer" }}
                    >
                      <div className="Title">
                        <h1>Title</h1>
                        <p>{note.title}</p>
                      </div>
                      <div className="Date">
                        <h1>Date</h1>
                        <p>
                          {new Date(note.createdAt).toLocaleDateString("en-GB")}
                        </p>
                      </div>
                      <div className="delete">
                        <div style={{ width: "20px", height: "23px" }}>
                          <Tooltip title="Delete" placement="right-start">
                            {" "}
                            <img src="/public/assets/icons/delete.png" alt="" />
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="write">
                <img
                  onClick={openModalEdit}
                  src="/public/assets/icons/pen.png"
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
