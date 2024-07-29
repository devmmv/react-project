import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DataType } from '../types';

const baseUrl = 'https://swapi.dev/api/';

export const swApi = createApi({
  reducerPath: 'swApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getPeoples: build.query<DataType, string>({
      query: (p: string) => `/people?${p}`,
    }),
    getPlanetInfo: build.query({
      query: (planetNum: string) => `/planets/${planetNum}`,
    }),
  }),
});

export const { useGetPeoplesQuery, useGetPlanetInfoQuery } = swApi;
