import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { URL } from '../constants';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),
  reducerPath: 'api',
  endpoints: () => ({}),
});
