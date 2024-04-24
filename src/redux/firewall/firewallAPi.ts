import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const firewallApi = createApi({
  reducerPath: 'firewallApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://172.30.30.121:4000/' }), // Adjust base URL as needed
  endpoints: (builder) => ({
    fetchFirewalls: builder.query<any, void>({
      query: (header) => (
        {

        url: 'webserver/get/organization',
        method: 'GET',
        headers: header.headers
      }),
      // Provide an optional `transformResponse` function to extract the data
      // transformResponse: (response: any) => console.log("fffffffffffffffff",response.data.response),
    }),
  }),
});
//  useGetTrialStatusMutation,
export const { useFetchFirewallsQuery } = firewallApi;
