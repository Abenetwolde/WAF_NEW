import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Initialize user state from local storage
  isloading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isloading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Save user to local storage
    },
    userLogout: (state) => {
      state.user = null;
      localStorage.removeItem('user'); // Remove user from local storage
    },
  },
});

export const { setUser, userLogout, setLoading } = authSlice.actions;

export default authSlice.reducer;
