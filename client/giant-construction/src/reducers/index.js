import { combineReducers } from 'redux';
import userReducer from './userReducer'; // Import the user reducer

const rootReducer = combineReducers({
  user: userReducer, // Ensure 'user' is correctly added here
  // other reducers can go here
});

export default rootReducer;