import {Config} from '@/Config';
import {BaseQueryFn} from '@reduxjs/toolkit/query/react';
import type {AxiosRequestConfig, AxiosRequestHeaders} from 'axios';
import axios from 'axios';
import {getToken} from '../reducer/auth';
import {store} from '../store';

const baseUrl = Config.API_URL as string;

axios.interceptors.request.use(config => {
  const token = getToken(store.getState());
  config.headers = {
    // 'Content-Type': 'multipart/form-data; boundary=some-random-value',
    Accept: '*/*',
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
    formData?: boolean;
  },
  unknown,
  unknown
> = async ({url, method, data, params, headers, formData}) => {
  try {
    console.log(
      '=========================Vừa request đến url:===============================',
      baseUrl + url,
      '\nvới method:',
      method,
      '\ndata:',
      data,
      formData ? '\nformData:' : '',
    );
    const result = await axios({
      url: baseUrl + url,
      method,
      data,
      params,
      headers,
    });

    return {data: result.data};
  } catch (err: any) {
    console.error(
      'FAIL===========Vừa request đến url',
      baseUrl + url,
      '=====================FAIL\n',
      // response,
      err.request._response,
    );

    return {
      error: {
        code: err.request._response.code,
        message: err.request._response.message,
      },
    };
  }
};
export default baseQuery;
