import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import usersReducer from './slices/userslist';

const initialState = {
  sidebarShow: true,
  theme: 'light',
};

// Reducer for managing the sidebar and theme
const uiReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    default:
      return state;
  }
};

// Create the store using configureStore
const store = configureStore({
  reducer: {
    profile: profileReducer, // Profile slice reducer
    ui: uiReducer, 
    users: usersReducer, // Employeelist slice reducer
  },
});

export default store;
