import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFirewalls = () => async (dispatch, getState) => {
  const userToken = getState().auth.user;
  try {
    const response = await axios.get('http://172.30.30.121:4000/webserver/get/organization', {
      headers: {
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBtb19hZG1pbiIsInJvbGUiOiJhZG1pbiIsIm9yZ2FuaXphdGlvbklEIjoiNjVkZjE1NTFhNDRhYTUxMzhhYzQ0MWRjIiwiaWF0IjoxNzExMDI4MDU5LCJleHAiOjE3NDI1NjQwNTl9.o2Ls9xMNC-6uUP-q01ztyoGGKHkpoS_Uc_S2d_agMvM",
      },
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching firewalls:', error);
    throw error;
  }
};
