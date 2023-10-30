import {Config} from '@/Config';
import {BaseQueryFn} from '@reduxjs/toolkit/query/react';
import type {AxiosError, AxiosRequestConfig, AxiosRequestHeaders} from 'axios';
import axios from 'axios';

const baseUrl = Config.API_URL as string;
axios.interceptors.request.use(config => {
  config.headers = {
    'Content-Type': 'application/json',
  } as AxiosRequestHeaders;
  config.withCredentials = true;
  return config;
});
const baseQuery: BaseQueryFn<
  {
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    headers?: AxiosRequestConfig['headers'];
  },
  unknown,
  unknown
> = async ({url, method, data, params, headers}) => {
  try {
    const result = await axios({
      url: baseUrl + url,
      method,
      data,
      params,
      headers,
    });
    return {data: result.data};
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: {
        code: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};
export default baseQuery;
