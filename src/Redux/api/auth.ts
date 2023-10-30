import {createApi} from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import {TResponse} from '@/types/response.type';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  tagTypes: ['Auth'],
  endpoints: builder => ({
    login: builder.mutation<TResponse<any>, any>({
      query: data => ({
        url: '/login',
        method: 'post',
        data,
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation<TResponse<any>, void>({
      query: () => ({
        url: '/logout',
        method: 'post',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});
export const {useLoginMutation, useLogoutMutation} = authApi;
