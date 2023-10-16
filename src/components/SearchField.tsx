type SearchFieldProps = {
  onChange: (search: string) => void;
};

const SearchField = ({ onChange }: SearchFieldProps) => {
  return (
    <input
      className="px-4 py-2 rounded text-black"
      type="text"
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search images..."
    />
  );
};

export default SearchField;
