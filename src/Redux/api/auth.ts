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
    signup: builder.mutation<
      TResponse<any>,
      {email: string; password: string; uuid: string}
    >({
      query: data => ({
        url: '/signup',
        method: 'post',
        data: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    getVerifyCode: builder.mutation<TResponse<any>, {email: string}>({
      query: email => ({
        url: '/get_verify_code',
        method: 'post',
        data: email,
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
      {password: string; new_password: string}
    >({
      query: data => ({
        url: '/change_password',
        method: 'post',
        data: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    checkEmail: builder.mutation<TResponse<any>, {email: string}>({
      query: data => ({
        url: '/check_email',
        method: 'post',
        data: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    deactiveUser: builder.mutation<TResponse<any>, void>({
      query: () => ({
        url: '/deactive_user',
        method: 'post',
      }),
      invalidatesTags: ['Auth'],
    }),
    restoreUser: builder.mutation<
      TResponse<any>,
      {email: string; code_verify: string}
    >({
      query: data => ({
        url: '/restore_user',
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
  useChangePasswordMutation,
  useCheckEmailMutation,
  useDeactiveUserMutation,
  useRestoreUserMutation,
} = authApi;
