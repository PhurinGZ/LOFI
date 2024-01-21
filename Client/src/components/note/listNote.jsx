// ListNote.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { useNoteContext } from '../../context/noteContext';
import { useAuth } from '../../context/authContext';

const ListNote = () => {
  const { state, dispatch } = useNoteContext();
  const { user } = useAuth();
  const BASE_URL = 'http://localhost:8000';
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setLoading(false);
          console.error('Authentication token not found.');
          setError('Authentication token not found.');
          return;
        }

        if (!user || !user.data || user.data._id === null || user.data._id === undefined) {
          //   setLoading(false);
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/editor/${user.data._id}/notes`, {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });

        // Update the notes in the context
        dispatch({ type: 'SET_NOTES', payload: response.data });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setLoading(false);
        setError('Error fetching notes.');
      }
    };

    fetchNotes();
  }, [user, dispatch]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  if (loading) {
    return <p>Loading notes...</p>;
  }

  return (
    <>
      {/* Button to open modal */}
      <Button variant="contained" onClick={handleOpenModal}>
        Open Modal
      </Button>

      {/* Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>List of Notes</DialogTitle>
        <DialogContent>
          {error ? <DialogContentText>{error}</DialogContentText> : null}
          {state.notes.length === 0 ? (
            <DialogContentText>No notes available.</DialogContentText>
          ) : (
            <ul>
              {state.notes.map((note) => (
                <li key={note._id}>
                  <strong>{note.title}</strong>: {note.content}
                </li>
              ))}
            </ul>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListNote;
