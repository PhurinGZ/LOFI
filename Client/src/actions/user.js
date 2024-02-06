// noteActions.js
import * as actionTypes from "../constants/actionTypes";
import * as api from "../api/axios";

// Action creator for fetching content
export const fetchContent = (userId, editorId) => async (dispatch) => {
  try {
    const { data } = await api.getContent(userId, editorId);
    dispatch({
      type: actionTypes.GET_CONTENT_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CONTENT_FAILURE,
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
    return data;
  } catch (error) {
    dispatch({
      type: actionTypes.SAVE_CONTENT_FAILURE,
      payload: error.message,
    });
    return { success: false, message: "Error saving content" };
  }
};

// Action creator for fetching notes
export const fetchNotes = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getNotes(userId);
    dispatch({ type: actionTypes.GET_NOTES_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: actionTypes.GET_NOTES_FAILURE, payload: error.message });
  }
};

// Action creator for updating content
export const updateContent =
  (content, title, userId, editorId) => async (dispatch) => {
    try {
      const { data } = await api.updateContent(
        content,
        title,
        userId,
        editorId
      );
      dispatch({ type: actionTypes.UPDATE_CONTENT_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_CONTENT_FAILURE,
        payload: error.message,
      });
      return { success: false, message: "Error updating content" };
    }
};

// Action creator for deleting notes
export const deleteNote = (userId, editorId) => async (dispatch) => {
  try {
    const { data } = await api.deleteNotes(userId, editorId);
    dispatch({ type: actionTypes.DELETE_CONTENT_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_CONTENT_FAILURE,
      payload: error.message,
    });
  }
};
