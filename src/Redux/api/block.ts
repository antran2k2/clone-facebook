import {createApi} from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import {TResponse} from '@/types/response.type';

export const blockApi = createApi({
  reducerPath: 'blockApi',
  baseQuery: baseQuery,
  tagTypes: ['Block'],
  endpoints: builder => ({
    getListBlocks: builder.query<TResponse, {count: string; index: string}>({
      query: data => ({
        url: '/get_list_blocks',
        method: 'POST',
        data: data,
      }),
      providesTags: ['Block'],
    }),
    setBlock: builder.mutation<TResponse, {user_id: string}>({
      query: data => ({
        url: '/set_block',
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['Block'],
    }),
  }),
});

export const {useGetListBlocksQuery, useSetBlockMutation} = blockApi;
