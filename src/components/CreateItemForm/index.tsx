import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "El título debe tener al menos 3 caracteres.")
    .required("Campo requerido"),
  description: yup
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres.")
    .required("Campo requerido"),
  price: yup
    .number()
    .positive("El precio debe ser un número positivo.")
    .required("Campo requerido"),
  brand: yup
    .string()
    .min(2, "La marca debe tener al menos 2 caracteres.")
    .required("Campo requerido"),
  category: yup.string().required("Selecciona una categoría."),
  stock: yup
    .number()
    .integer("El stock debe ser un número entero.")
    .positive("El stock debe ser positivo.")
    .required("Campo requerido"),
});

type FormData = yup.InferType<typeof formSchema>;

export default function CreateItemForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      brand: "",
      category: "",
      stock: 1,
    },
  });

  const categories = [
    { value: "electronics", label: "Electrónica" },
    { value: "clothing", label: "Ropa" },
    { value: "home", label: "Hogar" },
    { value: "books", label: "Libros" },
    { value: "toys", label: "Juguetes" },
    { value: "sports", label: "Deportes" },
    { value: "beauty", label: "Belleza" },
    { value: "food", label: "Alimentos" },
  ];

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      if (!import.meta.env.VITE_API_URL) {
        toast.error("Error de configuración", {
          description: "Configura la URL de la API en las variables de entorno",
        });
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Error en la creación");

      toast.success("Producto creado", {
        description: "El producto se ha creado exitosamente",
      });

      reset();
    } catch (error) {
      console.log(error);

      toast.error("Error al crear producto", {
        description: "Por favor intenta nuevamente",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            Crear nuevo producto
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-1.5">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Nombre del producto"
                {...register("title")}
              />

              {errors.title && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Descripción detallada"
                rows={5}
                {...register("description")}
              />

              {errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label htmlFor="price">Precio</Label>
                <Input id="price" type="number" {...register("price")} />
                {errors.price && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="brand">Marca</Label>
                <Input
                  id="brand"
                  placeholder="Marca del producto"
                  {...register("brand")}
                />
                {errors.brand && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.brand.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <Label htmlFor="category">Categoría</Label>
                <Select
                  value={watch("category")}
                  onValueChange={(value) =>
                    setValue("category", value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>

                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.category && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" type="number" {...register("stock")} />

                {errors.stock && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.stock.message}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear producto"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
