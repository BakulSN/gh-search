import { RepoCardProps } from "./types";

const RepoCard = ({ repo }: RepoCardProps) => {
  
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition duration-300">
      <h2 className="text-xl font-bold mb-2">
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          {repo.name}
        </a>
      </h2>
      {repo.description && <p className="mb-2">{repo.description}</p>}
      <div className="flex items-center justify-between">
        <span>
          {" "}
          <img
            className="inline-block w-5 h-5"
            src="src\assets\star.svg"
            alt="star"
          />{" "}
          {repo.stargazers_count}
        </span>

        <span>{formatDate(repo.updated_at)}</span>
      </div>
    </div>
  );
};

export default RepoCard;
