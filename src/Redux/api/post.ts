import {createApi} from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import {TResponse} from '@/types/response.type';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: baseQuery,
  tagTypes: ['Post'],
  endpoints: builder => ({
    addPost: builder.mutation<TResponse<any>, any>({
      query: data => ({
        url: '/add_post',
        method: 'post',
        data: data,
      }),
      invalidatesTags: ['Post'],
    }),
    getPosts: builder.query<TResponse<any>, any>({
      query: () => ({
        url: '/get_posts',
        method: 'get',
      }),
      providesTags: ['Post'],
    }),
  }),
});

export const {useAddPostMutation, useGetPostsQuery} = postApi;
