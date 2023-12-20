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
    getRequestedFriends: builder.query<
      TResponse,
      {count: string; index: string}
    >({
      query: data => ({
        url: '/get_requested_friends',
        method: 'POST',
        data: data,
      }),
    }),
    setRequestFriend: builder.mutation<TResponse, {user_id: string}>({
      query: data => ({
        url: '/set_request_friend',
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['Friend'],
    }),
    setAcceptFriend: builder.mutation<
      TResponse,
      {user_id: string; is_accept: string}
    >({
      query: data => ({
        url: '/set_accept_friend',
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['Friend'],
    }),
    getSuggestedFriends: builder.query<
      TResponse,
      {count: string; index: string}
    >({
      query: data => ({
        url: '/get_suggested_friends',
        method: 'POST',
        data: data,
      }),
    }),
    unFriend: builder.mutation<TResponse, {user_id: string}>({
      query: data => ({
        url: '/unfriend',
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['Friend'],
    }),
    delRequestFriend: builder.mutation<TResponse, {user_id: string}>({
      query: data => ({
        url: '/del_request_friend',
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['Friend'],
    }),
  }),
});

export const {
  useGetUserFriendsQuery,
  useGetRequestedFriendsQuery,
  useSetRequestFriendMutation,
  useSetAcceptFriendMutation,
  useGetSuggestedFriendsQuery,
  useUnFriendMutation,
  useDelRequestFriendMutation,
} = friendApi;
