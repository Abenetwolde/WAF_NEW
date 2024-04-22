import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../services/api';

// Thunk action to fetch firewalls
export const fetchFirewalls = createAsyncThunk(

  'firewall/fetchFirewalls',
  async (userToken: string, { rejectWithValue }) => {
    console.log("reach..................")
    try {
      const response = await api.get('webserver/get/organization', {
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBtb19hZG1pbiIsInJvbGUiOiJhZG1pbiIsIm9yZ2FuaXphdGlvbklEIjoiNjVkZjE1NTFhNDRhYTUxMzhhYzQ0MWRjIiwiaWF0IjoxNzEyOTEyMDQ0LCJleHAiOjE3NDQ0NDgwNDR9.rnavWlPLw5LjqNduB1z-7CDGF_Xeg3C5gh5lR1u0jvY"
        },
      });
      console.log("token........................",response?.data?.response)
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  firewalls: [],
  selectedFirewall: null,
  loading: false,
  error: null,
};

const firewallSlice = createSlice({
  name: 'firewall',
  initialState,
  reducers: {
    setSelectedFirewall(state, action) {
      state.selectedFirewall = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFirewalls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFirewalls.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.firewalls = action.payload.data.response;
      })
      .addCase(fetchFirewalls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedFirewall } = firewallSlice.actions;
export default firewallSlice.reducer;
