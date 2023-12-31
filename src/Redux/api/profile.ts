import {createApi} from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import {TResponse} from '@/types/response.type';

export type TProfile = {
  username: string;
  avatar: string;
};

type UserInfo = {
  username: string;
  description: string;
  avatar: string;
  address: string;
  city: string;
  country: string;
  cover_image: string;
  link: string;
};

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseQuery,
  tagTypes: ['Profile'],
  endpoints: builder => ({
    changeInfoAfterSignup: builder.mutation<TResponse<any>, TProfile>({
      query: data => ({
        url: '/change_profile_after_signup',
        method: 'post',
        data: data,
        formData: true,
      }),
      invalidatesTags: ['Profile'],
    }),
    getUserInfo: builder.mutation<TResponse<any>, {user_id: string}>({
      query: data => ({
        url: '/get_user_info',
        method: 'get',
        data: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    setUserInfo: builder.mutation<TResponse<any>, UserInfo>({
      query: data => ({
        url: '/set_user_info',
        method: 'post',
        data: data,
        formData: true,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {useChangeInfoAfterSignupMutation} = profileApi;
