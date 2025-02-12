import RepoCard from "./RepositoryCard";
import { RepoListProps } from "./types";

const RepoList = ({ repos }: RepoListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

export default RepoList;
