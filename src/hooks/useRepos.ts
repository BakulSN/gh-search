import { useState, useEffect, useCallback } from "react";
import { useLazyGetUserReposQuery } from "../services/githubApi";
import { Repository } from "../services/types";
import { useDebounce } from "./useDebounce";

const useRepos = () => {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<Repository[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const debouncedUsername = useDebounce(username, 500);

  const isTyping = username !== debouncedUsername;

  const [fetchRepos, { data, isFetching, isError, error }] =
    useLazyGetUserReposQuery();

  const clearRepos = useCallback(() => {
    setRepos([]);
    setPage(1);
    setHasMore(true);
  }, []);

  useEffect(() => {
    if (debouncedUsername.trim()) {
      clearRepos();
      fetchRepos({ username: debouncedUsername, page: 1 });
    }
  }, [debouncedUsername, fetchRepos, clearRepos]);

  useEffect(() => {
    if (data) {
      setRepos((prev) => [...prev, ...data]);
      if (data.length < 20) setHasMore(false);
    }
  }, [data]);

  const loadMore = useCallback(() => {
    if (!hasMore || isFetching || isError) return;
    setPage((prev) => prev + 1);
  }, [hasMore, isFetching, isError]);

  useEffect(() => {
    if (page > 1 && debouncedUsername.trim()) {
      fetchRepos({ username: debouncedUsername, page });
    }
  }, [page, debouncedUsername, fetchRepos]);

  return {
    username,
    setUsername,
    repos,
    isFetching,
    isError,
    error,
    loadMore,
    isTyping,
  };
};

export default useRepos;
