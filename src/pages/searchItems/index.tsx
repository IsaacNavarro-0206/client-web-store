import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Item, searchItems } from "@/service/items";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import SearchForm from "@/components/SearchForm";

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive text-center">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Ingresa un término de búsqueda para ver resultados
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (items?.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No se encontraron resultados para "{query}"
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-2">
      <SearchForm />

      <h1 className="text-2xl font-bold mb-6">
        Resultados para "{query}" ({items?.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items?.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchItems;
