import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Item, searchItems, SearchResults } from "@/service/items";
import ProductCard from "@/components/ProductCard";
import SearchForm from "@/components/SearchForm";
import LoadingState from "@/components/SearchStates/LoadingState";
import ErrorState from "@/components/SearchStates/ErrorState";
import NoQueryState from "@/components/SearchStates/NoQueryState";
import NoResultsState from "@/components/SearchStates/NoResultsState";
import usePagination from "@/hooks/usePagination";
import PaginationControls from "@/components/PaginationControls";

const SearchItems = () => {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const query = searchParams.get("search") || "";
  const { currentPage, limit, setCurrentPage, setLimit } = usePagination();

  useEffect(() => {
    const fetchItems = async () => {
      if (!query) {
        setItems([]);
        setTotalItems(0);
        setTotalPages(0);
        setIsLoading(false);
        setError(null); 
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const { data }: { data: SearchResults } = await searchItems(
          query,
          currentPage,
          limit
        );

        setItems(data.results);
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al buscar productos"
        );
        setItems([]);
        setTotalItems(0);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [query, currentPage, limit]);

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
            Resultados para "{query}" ({totalItems})
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items?.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            limit={limit}
            onPageChange={setCurrentPage}
            onLimitChange={setLimit}
          />
        </>
      )}
    </div>
  );
};

export default SearchItems;
