import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from './userSlice';
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://172.30.30.121:4000/' }),
  endpoints: (builder) => ({
    login: builder.mutation({

      query: (credentials) => (
        // console.log("login mu..............", credentials),
        {

        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      
      onSuccess: (data, variables, api) => {
        localStorage.setItem('user', JSON.stringify(data)); // Save user data to local storage
        api.dispatch(setUser(data)); // Dispatch setUser action to update user state
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      onQueryStarted: (mutation, { dispatch, queryFulfilled }) => {
        queryFulfilled.then(() => {
          localStorage.removeItem('user'); // Remove user data from local storage
          dispatch(setUser(null)); // Dispatch setUser action to clear user state
        });
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;

// export const selectUser = (state) => state.authApi.user;

// export default authApi.reducer;
