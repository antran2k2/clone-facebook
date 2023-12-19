import {createApi} from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import {TResponse} from '@/types/response.type';

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: baseQuery,
  tagTypes: ['Search'],
  endpoints: builder => ({
    search: builder.query<
      TResponse,
      {keyword: string; index: string; user_id: string; count: string}
    >({
      query: data => ({
        url: '/search',
        method: 'POST',
        data: data,
      }),
      providesTags: ['Search'],
    }),
    searchUser: builder.query<
      TResponse,
      {keyword: string; index: string; count: string}
    >({
      query: data => ({
        url: '/search_user',
        method: 'POST',
        data: data,
      }),
      providesTags: ['Search'],
    }),
    getSavedSearch: builder.query<TResponse, {index: string; count: string}>({
      query: data => ({
        url: '/get_saved_search',
        method: 'POST',
        data: data,
      }),
      providesTags: ['Search'],
    }),
    delSavedSearch: builder.mutation<
      TResponse,
      {search_id: string; all: string}
    >({
      query: data => ({
        url: '/del_saved_search',
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['Search'],
    }),
  }),
});

export const {
  useGetSavedSearchQuery,
  useSearchQuery,
  useSearchUserQuery,
  useDelSavedSearchMutation,
} = searchApi;
