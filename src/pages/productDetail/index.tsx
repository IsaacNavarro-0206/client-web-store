import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";
import { getItem, Item } from "@/service/items";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ProductDetail = () => {
  const [item, setItem] = useState<Item | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    let isMounted = true; // Bandera para rastrear el estado de montaje del componente

    const getItemById = async () => {
      try {
        const { data } = await getItem(id as string);

        if (isMounted) {
          setItem(data);
        }
      } catch (error) {
        console.error("Error obteniendo item:", error);
        toast.error("Error al cargar el producto", {
          description:
            "No se pudieron obtener los detalles del producto. Inténtalo de nuevo más tarde.",
        });
      }
    };

    getItemById();

    return () => {
      isMounted = false; // Función de limpieza para establecer la bandera en falso al desmontar
    };
  }, [id]);

  // Mostrar estado de carga o devolver null si los datos del item aún no están disponibles
  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto min-h-screen p-4 md:p-8 w-full">
      <Button
        variant="link"
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-sm mb-6 hover:underline p-0 h-auto cursor-pointer"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a resultados
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {item.images && item.images.length > 0 && (
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden border">
              <img
                src={item.images[0]}
                alt={item.title}
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            {item.images &&
              item.images.length > 1 &&
              item.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] relative rounded-lg overflow-hidden border"
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${item.title} - Imagen ${index + 2}`}
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 16vw"
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">{item.category}</p>
            <h1 className="text-3xl font-bold mt-1">{item.title}</h1>
            <div className="mt-2">
              <StarRating rating={item.rating} />
            </div>
          </div>

          <div className="text-3xl font-bold">${item.price.toFixed(2)}</div>

          <div>
            <h2 className="text-lg font-medium mb-2">Descripción</h2>
            <p className="text-muted-foreground">{item.description}</p>
          </div>

          <Card className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Marca</p>
                <p className="font-medium">{item.brand}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Stock</p>
                <p className="font-medium">{item.stock} unidades</p>
              </div>
            </div>
          </Card>

          <div className="pt-4">
            <Button size="lg" className="w-full">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Añadir al carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
