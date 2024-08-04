import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/users/login',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response) => {
                return { user: response.data.user, token: response.token };
              },
            }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/users/signup',
                method: 'POST',
                body: userData,
            }),
            transformResponse: (response) => {
                return { user: response.data.user, token: response.token };
              },
            }),
          }),
        });

export const { useLoginMutation, useRegisterMutation } = apiSlice;
