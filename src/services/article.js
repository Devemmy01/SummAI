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
        // Convert number to "X paragraphs" format
        const lengthParam = `${params.length} paragraphs`;
        return `summarize?url=${encodeURIComponent(params.url)}&length=${lengthParam}&lang=${params.lang}`;
      },
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;