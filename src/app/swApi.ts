import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ItemType } from '../types';

const baseUrl = 'https://swapi.dev/api/';

export const swApi = createApi({
  reducerPath: 'swApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    getPeoples: build.query<ItemType[], string>({
      query: (p: string) => `/people?${p}`,
    }),
    getPlanetInfo: build.query({
      query: (planetNum: string) => `/planets/${planetNum}`,
    }),
  }),
});

export const { useGetPeoplesQuery, useGetPlanetInfoQuery } = swApi;
