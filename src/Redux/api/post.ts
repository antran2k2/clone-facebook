import {createApi} from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import {TResponse} from '@/types/response.type';
import {
  GetListPostsDTO,
  ReportPostDTO,
  TPost,
  TPostDetail,
} from '@/types/post.type';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: baseQuery,
  tagTypes: ['Post'],
  endpoints: builder => ({
    addPost: builder.mutation<TResponse<any>, FormData>({
      query: data => {
        return {
          url: '/add_post',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data;',
          },
          data: data,
          formData: true,
        };
      },
    }),

    getListPosts: builder.query<
      TResponse<{post: TPost[]; last_id: string; new_items: string}>,
      GetListPostsDTO
    >({
      query: data => ({
        url: '/get_list_posts',
        method: 'post',
        data: data,
      }),
    }),
    getPost: builder.query<TResponse<TPostDetail>, {id: string}>({
      query: data => ({
        url: '/get_post',
        method: 'post',
        data: data,
      }),
    }),
    editPost: builder.mutation<TResponse<any>, FormData>({
      query: payload => ({
        url: '/edit_post',
        method: 'post',
        data: payload,
        headers: {
          'Content-Type': 'multipart/form-data;',
        },
        formData: true,
      }),
    }),
    deletePost: builder.mutation<TResponse<any>, {id: string}>({
      query: data => ({
        url: '/delete_post',
        method: 'post',
        data: data,
      }),
    }),
    reportPost: builder.mutation<TResponse<any>, ReportPostDTO>({
      query: data => ({
        url: '/report_post',
        method: 'post',
        data: data,
      }),
    }),
    getNewPosts: builder.query<TResponse<{post: TPost[]}>, {count: string}>({
      query: data => ({
        url: '/get_new_posts',
        method: 'post',
        data: data,
      }),
    }),
    setViewedPost: builder.mutation<TResponse<any>, {id: string}>({
      query: data => ({
        url: '/set_viewed_post',
        method: 'post',
        data: data,
      }),
    }),
    getListVideos: builder.query<TResponse, any>({
      query: data => ({
        url: '/get_list_videos',
        method: 'post',
        data: data,
      }),
    }),
  }),
});

export const {
  useAddPostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useEditPostMutation,
  useReportPostMutation,
  useLazyGetListPostsQuery,
  useGetListPostsQuery,
  useLazyGetNewPostsQuery,
  useGetNewPostsQuery,
  useSetViewedPostMutation,
  useGetListVideosQuery,
  useLazyGetListVideosQuery,
} = postApi;
