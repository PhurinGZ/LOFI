// NoteContext.jsx

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './authContext';

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const BASE_URL = 'http://localhost:8000';
  const initialState = {
    notes: [],
  };
  const { user } = useAuth();

  const noteReducer = (state, action) => {
    switch (action.type) {
      case 'SET_NOTES':
        return { ...state, notes: action.payload };
      case 'ADD_NOTE':
        return { ...state, notes: [...state.notes, action.payload] };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(noteReducer, initialState);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Authentication token not found.');
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/editor/${user.data._id}/notes`, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      dispatch({ type: 'SET_NOTES', payload: response.data });
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
    const intervalId = setInterval(fetchNotes, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [user]);

  return (
    <NoteContext.Provider value={{ state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNoteContext must be used within a NoteProvider');
  }
  return context;
};
