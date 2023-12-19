import {createApi} from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import {TResponse} from '@/types/response.type';

export const friendApi = createApi({
  reducerPath: 'friendApi',
  baseQuery: baseQuery,
  tagTypes: ['Friend'],
  endpoints: builder => ({
    getUserFriends: builder.query<
      TResponse,
      {count: string; index: string; user_id: string}
    >({
      query: data => ({
        url: '/get_user_friends',
        method: 'POST',
        data: data,
      }),
      providesTags: ['Friend'],
    }),
    setBlock: builder.mutation<TResponse, {user_id: string}>({
      query: data => ({
        url: '/set_block',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Friend'],
    }),
  }),
});

export const {useGetUserFriendsQuery} = friendApi;
