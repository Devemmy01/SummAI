import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', import.meta.env.VITE_RAPID_API_KEY);
      headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) => {
        const { url, lang = 'en' } = params;
        console.log('Attempting to summarize URL:', url); // Debug log
        return {
          url: `summarize?url=${encodeURIComponent(url)}&lang=${lang}`,
          validateStatus: (response) => {
            if (response.status === 400) {
              console.error('Invalid URL or unsupported domain:', url);
            } else if (response.status === 401) {
              console.error('API key invalid or expired');
            } else if (response.status === 403) {
              console.error('Access forbidden - domain may be blocked');
            }
            return response.status < 500;
          },
        };
      },
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;