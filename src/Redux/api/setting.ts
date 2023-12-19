import {createApi} from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import {TResponse} from '@/types/response.type';

export const settingApi = createApi({
  reducerPath: 'settingApi',
  baseQuery: baseQuery,
  tagTypes: ['Setting'],
  endpoints: builder => ({
    setDevtoken: builder.mutation<
      TResponse,
      {devtoken: string; devtype: string}
    >({
      query: data => ({
        url: '/set_devtoken',
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['Setting'],
    }),
    buyCoins: builder.mutation<TResponse, {coins: string; code: string}>({
      query: data => ({
        url: '/buy_coins',
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['Setting'],
    }),
    getPushSetting: builder.query<TResponse, void>({
      query: () => ({
        url: '/get_push_setting',
        method: 'POST',
      }),
      providesTags: ['Setting'],
    }),
    setPushSetting: builder.mutation<
      TResponse,
      {
        like_comment: string;
        from_friends: string;
        requested_friend: string;
        suggested_friend: string;
        birthday: string;
        video: string;
        report: string;
        sound_on: string;
        notification_on: string;
        vibrant_on: string;
        led_on: string;
      }
    >({
      query: data => ({
        url: '/set_push_setting',
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['Setting'],
    }),
  }),
});

export const {
  useSetDevtokenMutation,
  useBuyCoinsMutation,
  useGetPushSettingQuery,
  useSetPushSettingMutation,
} = settingApi;
