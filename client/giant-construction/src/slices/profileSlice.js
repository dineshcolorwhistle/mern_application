import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    usermame: "",
    email: ""
}

const ProfileSlice = createSlice({
    name:'profile',
    initialState,
    reducers: {
        setProfileData: (state, action) => {
            state.username = action.payload.usermame;
            state.email = action.payload.email;
        },
        clearProfiledata: (state) =>{
            state.username = '';
            state.email = '';
        },
    },
});

export const{setProfileData,clearProfiledata} = ProfileSlice.actions;
export default ProfileSlice.reducer;




