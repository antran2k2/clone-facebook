import {Config} from '@/Config';
import {BaseQueryFn} from '@reduxjs/toolkit/query/react';
import type {AxiosError, AxiosRequestConfig, AxiosRequestHeaders} from 'axios';
import axios from 'axios';
import {getToken} from '../reducer/auth';
import {store} from '../store';

const baseUrl = Config.API_URL as string;

axios.interceptors.request.use(config => {
  const token = getToken(store.getState());
  config.headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
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
    console.log(
      '=========================Vừa request đến url:===============================',
      baseUrl + url,
      '\nvới method:',
      method,
      '\ndata:',
      data,
    );
    const result = await axios({
      url: baseUrl + url,
      method,
      data,
      params,
      headers,
    });

    return {data: result.data};
  } catch (axiosError) {
    console.log(
      '=========================Vừa request đến url',
      baseUrl + url,
      'thất bại===============================',
    );
    const err = axiosError as AxiosError;
    return {
      // error: err.response?.data as TErrorResponse,
      error: err,
    };
  }
};
export default baseQuery;
