// editorReducer.js
import * as actionTypes from '../constants/actionTypes';

const initialState = {
  data: {},
  notes: [],
  error: null,
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CONTENT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case actionTypes.GET_CONTENT_FAILURE:
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    case actionTypes.SAVE_CONTENT_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case actionTypes.SAVE_CONTENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.GET_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload,
        error: null,
      };
    case actionTypes.GET_NOTES_FAILURE:
      return {
        ...state,
        notes: [],
        error: action.payload,
      };
    case actionTypes.UPDATE_CONTENT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case actionTypes.UPDATE_CONTENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.DELETE_CONTENT_SUCCESS:
      return {
        ...state,
        data: null,
        error: null,
      };
    case actionTypes.DELETE_CONTENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default editorReducer;
