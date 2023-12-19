import {createApi} from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import {TResponse} from '@/types/response.type';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: baseQuery,
  tagTypes: ['Notification'],
  endpoints: builder => ({
    getNotification: builder.query<TResponse, {count: string; index: string}>({
      query: data => ({
        url: '/get_notification',
        method: 'POST',
        data: data,
      }),
      providesTags: ['Notification'],
    }),
    checkNewItems: builder.query<
      TResponse,
      {last_id: string; category_id: string}
    >({
      query: data => ({
        url: '/check_new_items',
        method: 'POST',
        data: data,
      }),
      providesTags: ['Notification'],
    }),
  }),
});

export const {useGetNotificationQuery, useCheckNewItemsQuery} = notificationApi;
