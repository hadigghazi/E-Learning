import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
  
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
  
      return headers;
    },
  });

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => ({
        user: response.data.user,
        token: response.token,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/users/signup',
        method: 'POST',
        body: userData,
      }),
      transformResponse: (response) => ({
        user: response.data.user,
        token: response.token,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
    }),
    getCourses: builder.query({
        query: () => '/courses',
      }),
    getCourseById: builder.query({
        query: (id) => `/courses/${id}`,
    }),
    enroll: builder.mutation({
        query: (body) => ({
          url: `/enrollments/enroll/${body.courseId}`,
          method: 'POST',
        }),
      }),
      getMyCourses: builder.query({
        query: () => '/enrollments/my-courses',
      }),
      withdraw: builder.mutation({
        query: (body) => ({
          url: `/withdrawals/apply`,
          method: 'POST',
          body,
        }),
      }),
      getFilesForCourse: builder.query({
        query: (id) => `/files/course/${id}`,
      }),
  }),
});
export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useGetCoursesQuery, useGetCourseByIdQuery, useEnrollMutation, useGetMyCoursesQuery, useWithdrawMutation, useGetFilesForCourseQuery } = apiSlice;
