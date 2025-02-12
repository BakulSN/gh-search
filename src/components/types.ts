import { Repository } from "../services/types";

export interface ErrorMessageProps {
  error: string;
}

export interface RepoCardProps {
  repo: Repository;
}

export interface RepoListProps {
  repos: Repository[];
}

export interface NoReposMessageProps {
  username: string;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}
