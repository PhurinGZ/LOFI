// NoteContext.jsx
import { createContext, useContext, useEffect, useMemo } from "react";
import { useAuth } from "./authContext";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { fetchNotes } from "../actions/user";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const debouncedFetchNotes = debounce(() => {
    dispatch(fetchNotes(user.data._id));
  }, 5000);

  useEffect(() => {
    debouncedFetchNotes();
    return () => debouncedFetchNotes.cancel();
  }, [user, dispatch, debouncedFetchNotes]);

  const contextValue = useMemo(() => ({ dispatch }), [dispatch]);

  return (
    <NoteContext.Provider value={contextValue}>{children}</NoteContext.Provider>
  );
};

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNoteContext must be used within a NoteProvider");
  }
  return context;
};