import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Repository, GetReposArgs } from "./types";

const BASE_URL = "https://api.github.com/";


export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
  
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getUserRepos: builder.query<Repository[], GetReposArgs>({
      query: ({ username, page }) =>
        `users/${username}/repos?page=${page}&per_page=20&sort=updated`,
    }),
  }),
});

export const { useLazyGetUserReposQuery } = githubApi;
