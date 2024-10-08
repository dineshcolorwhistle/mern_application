const initialState = {
    username: '',
    email: '',
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          username: action.payload.username,
          email: action.payload.email,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;