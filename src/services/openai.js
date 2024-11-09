import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const MAX_RETRIES = 3;

export const openaiApi = createApi({
  reducerPath: 'openaiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openai.com/v1',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.mutation({
      async queryFn(args, _queryApi, _extraOptions, fetchWithBQ) {
        let attempt = 0;
        let result;
        while (attempt < MAX_RETRIES) {
          try {
            result = await fetchWithBQ({
              url: '/chat/completions',
              method: 'POST',
              body: {
                model: 'gpt-3.5-turbo',
                messages: [
                  {
                    role: 'system',
                    content: `You are a professional summarizer. Summarize the following text into ${args.length} paragraphs. Output language: ${args.lang}`
                  },
                  {
                    role: 'user',
                    content: args.text
                  }
                ],
                temperature: 0.7,
                max_tokens: 500
              },
            });

            if (!result.error) {
              return { data: result.data.choices[0].message.content.trim() };
            }

            if (result.error.status !== 429) {
              throw new Error(result.error.data?.message || 'Failed to generate summary');
            }

            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
            attempt++;
          } catch (error) {
            return { error: { status: error.status || 500, data: { message: error.message || 'Failed to generate summary' } } };
          }
        }
        return { error: { status: 429, data: { message: 'Too many requests. Please try again later.' } } };
      }
    }),
  }),
});

export const { useGetSummaryMutation } = openaiApi;