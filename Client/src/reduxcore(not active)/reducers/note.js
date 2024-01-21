import {
  FETCH_CONTENT_SUCCESS,
  FETCH_CONTENT_FAILURE,
  SAVE_CONTENT_SUCCESS,
  SAVE_CONTENT_FAILURE,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAILURE,
  FETCH_NOTES_REQUEST,
} from "../constants/actionTypes";

const initialState = {
  content: {},
  notes: [],
  error: null,
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTENT_SUCCESS:
      return { ...state, content: action.payload, error: null };

    case FETCH_CONTENT_FAILURE:
      return { ...state, content: {}, error: action.payload };

    case SAVE_CONTENT_SUCCESS:
      return { ...state, error: null };

    case SAVE_CONTENT_FAILURE:
      return { ...state, error: action.payload };

    case FETCH_NOTES_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_NOTES_SUCCESS:
      return { ...state, loading: false, notes: action.payload, error: null };

    case FETCH_NOTES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default editorReducer;
