import {
  DELETE_USER_DATA,
  FETCH_USER_DATA,
  UPDATE_USER_DATA,
  USER_ERROR,
} from "../constants/actionTypes";

const initialState = {
  user_data: {},
  error: null,
};

const songModeReducers = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_USER_DATA:
      // Handle the DELETE_USER_DATA action
      return {
        ...state,
        user_data: action.payload,
        error: null,
      };

    case FETCH_USER_DATA:
      // Handle the FETCH_USER_DATA action
      return {
        ...state,
        user_data: action.payload,
        error: null,
      };

    case UPDATE_USER_DATA:
      // Handle the UPDATE_USER_DATA action
      return {
        ...state,
        user_data: action.payload,
        error: null,
      };

    case USER_ERROR:
      // Handle the USER_ERROR action
      return {
        ...state,
        error: action.payload
      };

    // Add more cases if needed for other action types

    default:
      return state;
  }
};

export default songModeReducers;
