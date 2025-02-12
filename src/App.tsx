import "./App.css";
import React from "react";
import SearchInput from "./components/SearchInput";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import ErrorMessage from "./components/ErrorMessage";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import RepoList from "./components/RepoList";
import Spinner from "./components/Spinner";
import NoReposMessage from "./components/NoReposMessage";
import useRepos from "./hooks/useRepos";

const App: React.FC = () => {
  const {
    username,
    setUsername,
    repos,
    isFetching,
    isError,
    error,
    loadMore,
    isTyping,
  } = useRepos();

  useInfiniteScroll({ callback: loadMore, threshold: 200 });

  const getErrorMessage = (
    error: FetchBaseQueryError | SerializedError | undefined
  ): string => {
    if (typeof error === "string") {
      return error;
    }

    if (error && typeof error === "object" && "status" in error) {
      if (error.status === 404) {
        return "Пользователь не найден.";
      }
      if (error.status === 403) {
        return "Превышен лимит запросов к GitHub API. Попробуйте позже.";
      }
      if (error.status === 500) {
        return "Ошибка на сервере. Пожалуйста, попробуйте позже.";
      }
      return `Ошибка: ${error.status}`;
    }

    return "Произошла неизвестная ошибка.";
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        GitHub Репозитории
      </h1>
      <SearchInput value={username} onChange={setUsername} />

      {isError && username && <ErrorMessage error={getErrorMessage(error)} />}

      {username && <RepoList repos={repos} />}

      {isFetching && <Spinner />}

      {!isFetching && repos.length === 0 && username && !error && !isTyping && (
        <NoReposMessage username={username} />
      )}
    </div>
  );
};

export default App;
