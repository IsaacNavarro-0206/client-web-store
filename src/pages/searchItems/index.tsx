import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Item, searchItems } from "@/service/items";
import ProductCard from "@/components/ProductCard";
import SearchForm from "@/components/SearchForm";
import LoadingState from "@/components/SearchStates/LoadingState";
import ErrorState from "@/components/SearchStates/ErrorState";
import NoQueryState from "@/components/SearchStates/NoQueryState";
import NoResultsState from "@/components/SearchStates/NoResultsState";

const SearchItems = () => {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = searchParams.get("search") || "";

  useEffect(() => {
    const fetchItems = async () => {
      if (!query) {
        setItems([]);
        setIsLoading(false);
        setError(null); // Reset error state when query is empty
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const { data } = await searchItems(query);

        setItems(data.results);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al buscar productos"
        );
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [query]);

  return (
    <div className="container py-8 space-y-6">
      <SearchForm />

      {isLoading && <LoadingState />}

      {!isLoading && error && <ErrorState error={error} />}

      {!isLoading && !error && !query && <NoQueryState />}

      {!isLoading && !error && query && items?.length === 0 && (
        <NoResultsState query={query} />
      )}

      {!isLoading && !error && query && items?.length > 0 && (
        <>
          <h1 className="text-2xl font-bold">
            Resultados para "{query}" ({items?.length})
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items?.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchItems;
