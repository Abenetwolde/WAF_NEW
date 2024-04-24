import { Logout } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user:  {
        id: null,
        email: null,
        token: JSON.parse(localStorage.getItem('user') || 'null'),
        role: null
    },
    isloading:false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isloading = action.payload;
        },
        setToken: (state, action) => {
            state.user.token = action.payload;
        },
        setUser: (state, action) => {
            state = { ...action.payload };
            // console.log("user from state", state.user);
        },
        userLogout: (state) => {
            state.user=null
            localStorage.removeItem('user');
            // console.log("user from state", state.user);
        },
    },
});

export const { setToken, setUser, userLogout,setLoading } = authSlice.actions;
export default authSlice.reducer;