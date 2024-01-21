// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
// import thunk from 'redux-thunk';

// Import your reducers
import noteReducer from '../reducers/note'; // Create this reducer

// Combine reducers if you have multiple reducers
const rootReducer = combineReducers({
  note: noteReducer,
  // Add other reducers here if needed
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;
