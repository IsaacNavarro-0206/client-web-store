import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      // navigate(`/items?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl mx-auto">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          type="search"
          placeholder="Buscar productos..."
          className="pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button type="submit" className="ml-2">
        Buscar
      </Button>
    </form>
  );
};

export default SearchForm;
