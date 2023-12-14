import {createApi} from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import {TResponse} from '@/types/response.type';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: baseQuery,
  tagTypes: ['Comment'],
  endpoints: builder => ({
    getMarkComment: builder.mutation<TResponse<any>, any>({
      query: data => ({
        url: '/get_mark_comment',
        method: 'post',
        data: data,
        formData: true,
      }),
      invalidatesTags: ['Comment'],
    }),
    setMarkComment: builder.mutation<TResponse<any>, any>({
      query: data => ({
        url: '/set_mark_comment',
        method: 'post',
        data: data,
      }),
      invalidatesTags: ['Comment'],
    }),
    feel: builder.mutation<TResponse<any>, {id: string; type: string}>({
      query: data => ({
        url: '/feel',
        method: 'post',
        data: data,
        formData: true,
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const {
  useFeelMutation,
  useGetMarkCommentMutation,
  useSetMarkCommentMutation,
} = commentApi;
