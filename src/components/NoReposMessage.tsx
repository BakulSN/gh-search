import { NoReposMessageProps } from "./types";

const NoReposMessage = ({ username }: NoReposMessageProps) => {
  return (
    <div className="text-center mt-4">
      У пользователя {username} просто нет репозиториев
    </div>
  );
};

export default NoReposMessage;
