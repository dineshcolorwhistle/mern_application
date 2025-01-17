import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice'; // Import your profile slice

// Old state management for sidebar and theme
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
    ui: uiReducer,           // UI slice reducer (sidebar, theme)
  },
});

export default store;
