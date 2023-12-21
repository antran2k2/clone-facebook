import {createApi} from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import {TResponse} from '@/types/response.type';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: baseQuery,
  tagTypes: ['Comment'],
  endpoints: builder => ({
    getMarkComment: builder.query<
      TResponse<any>,
      {
        id: string;
        index: string;
        count: string;
      }
    >({
      query: data => ({
        url: '/get_mark_comment',
        method: 'post',
        data: data,
      }),
    }),
    setMarkComment: builder.mutation<
      TResponse<any>,
      {
        id: string;
        content: string;
        index: string;
        count: string;
        mark_id: string;
        type: string;
      }
    >({
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
    getListFeels: builder.mutation<
      TResponse<any>,
      {id: string; index: string; count: string}
    >({
      query: data => ({
        url: '/get_list_feels',
        method: 'post',
        data: data,
      }),
      invalidatesTags: ['Comment'],
    }),
    deleteFeel: builder.mutation<TResponse<any>, {id: string}>({
      query: data => ({
        url: '/delete_feel',
        method: 'post',
        data: data,
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const {
  useFeelMutation,
  useGetMarkCommentQuery,
  useSetMarkCommentMutation,
  useGetListFeelsMutation,
  useDeleteFeelMutation,
} = commentApi;
