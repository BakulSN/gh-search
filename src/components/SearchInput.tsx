import { SearchInputProps } from "./types";

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Введите имя пользователя GitHub"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default SearchInput;
