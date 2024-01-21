// noteActions.js
import * as actionTypes from '../constants/actionTypes';
import * as api from '../../api/axios'; // Adjust the path accordingly

// Action creator for fetching content
export const fetchContent = (userId, editorId) => async (dispatch) => {
  try {
    const { data } = await api.getContent(userId, editorId);
    dispatch({
      type: actionTypes.FETCH_CONTENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FETCH_CONTENT_FAILURE,
      payload: error.message,
    });
  }
};

// Action creator for saving content
export const saveContent = (content, title, userId) => async (dispatch) => {
  try {
    const { data } = await api.saveContent(content, title, userId);
    dispatch({
      type: actionTypes.SAVE_CONTENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.SAVE_CONTENT_FAILURE,
      payload: error.message,
    });
  }
};

// Action creator for fetching notes
export const fetchNotes = (userId) => async (dispatch) => {
    try {
      dispatch({ type: actionTypes.FETCH_NOTES_REQUEST });
  
      const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
  
      if (!token) {
        throw new Error("Authentication token not found.");
      }
  
      const { data } = await api.getNotes(userId, token);
  
      dispatch({ type: actionTypes.FETCH_NOTES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: actionTypes.FETCH_NOTES_FAILURE, payload: error.message });
    }
  };
  
  
