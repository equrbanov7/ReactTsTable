import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./index.scss";

interface SearchProps {
  setSearchValue: (searchValue: string) => void;
}

type SearchInputs = {
  query: string;
};

const Search = ({ setSearchValue }: SearchProps) => {
  const { register, watch } = useForm<SearchInputs>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const watchedQuery = watch("query");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchValue(searchTerm);
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setSearchValue]);

  useEffect(() => {
    setSearchTerm(watchedQuery || "");
  }, [watchedQuery]);

  return (
    <form className="Search">
      <input
        type="text"
        placeholder="Search Here"
        {...register("query", { required: true })}
      />
    </form>
  );
};

export default Search;
