import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const textSummaryApi = createApi({
  reducerPath: 'textSummaryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'YOUR_CHOSEN_API_ENDPOINT',
  }),
  endpoints: (builder) => ({
    getTextSummary: builder.query({
      query: ({ text, length, lang }) => ({
        url: '/summarize',
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          // Add any required API keys
        },
        body: { text, length, lang },
      }),
    }),
  }),
});

export const { useLazyGetTextSummaryQuery } = textSummaryApi; 