// NoteContext.jsx
import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from './authContext';
import { debounce } from 'lodash';

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

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

      const response = await api.get(`/api/editor/${user.data._id}/notes`, {
        headers: {
          'x-auth-token': token,
        },
      });

      dispatch({ type: 'SET_NOTES', payload: response.data });
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const debouncedFetchNotes = debounce(fetchNotes, 5000);

  useEffect(() => {
    debouncedFetchNotes();

    return () => debouncedFetchNotes.cancel(); // Cancel debounced fetch on component unmount
  }, [user]);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <NoteContext.Provider value={contextValue}>
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
