import {Config} from '@/Config';
import {BaseQueryFn} from '@reduxjs/toolkit/query/react';
import type {AxiosError, AxiosRequestConfig, AxiosRequestHeaders} from 'axios';
import axios from 'axios';
import localStorage from 'redux-persist/es/storage';

const baseUrl = Config.API_URL as string;
axios.interceptors.request.use(config => {
  config.headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
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
      // error: err.response?.data as TErrorResponse,
      error: err,
    };
  }
};
export default baseQuery;
