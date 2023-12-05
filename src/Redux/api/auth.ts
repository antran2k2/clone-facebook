import {createApi} from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import {TResponse} from '@/types/response.type';
import {SignUpInfo} from '@/types/user.type';

export type TLoginResponse = {
  id: string;
  username: string;
  token: string;
  avatar: string;
  active: string;
  coins: string;
};

export type TLoginRequest = {
  email: string;
  password: string;
  uuid: string;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  tagTypes: ['Auth'],
  endpoints: builder => ({
    login: builder.mutation<TResponse<TLoginResponse>, TLoginRequest>({
      query: data => ({
        url: '/login',
        method: 'post',
        data: data,
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
    signup: builder.mutation<TResponse<any>, SignUpInfo>({
      query: data => ({
        url: '/signup',
        method: 'post',
        data: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    getVerifyCode: builder.mutation<TResponse<any>, string>({
      query: email => ({
        url: '/get_verify_code',
        method: 'post',
        data: {email},
      }),
      invalidatesTags: ['Auth'],
    }),
    checkVerifyCode: builder.mutation<
      TResponse<any>,
      {email: string; code: string}
    >({
      query: data => ({
        url: '/check_verify_code',
        method: 'post',
        data: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    resetPassword: builder.mutation<
      TResponse<any>,
      {email: string; password: string}
    >({
      query: data => ({
        url: '/reset_password',
        method: 'post',
        data: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    changePassword: builder.mutation<
      TResponse<any>,
      {password: string; newPassword: string}
    >({
      query: data => ({
        url: '/change_password',
        method: 'post',
        data: data,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});
export const {
  useLoginMutation,
  useLogoutMutation,
  useCheckVerifyCodeMutation,
  useGetVerifyCodeMutation,
  useResetPasswordMutation,
  useSignupMutation,
} = authApi;
