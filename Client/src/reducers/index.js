// reducers/index.js
import { combineReducers } from "redux";
import noteReducer from "./note";

const rootReducer = combineReducers({
  note: noteReducer,
  // Add other reducers here if needed
});

export default rootReducer;
