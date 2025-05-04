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
import { createItem } from "@/service/items"; // Importar createItem
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

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
    .typeError("El precio debe ser un número.")
    .positive("El precio debe ser un número positivo.")
    .required("Campo requerido"),
  brand: yup
    .string()
    .min(2, "La marca debe tener al menos 2 caracteres.")
    .required("Campo requerido"),
  category: yup.string().required("Selecciona una categoría."),
  stock: yup
    .number()
    .typeError("El stock debe ser un número.")
    .integer("El stock debe ser un número entero.")
    .min(0, "El stock no puede ser negativo.")
    .required("Campo requerido"),
  images: yup
    .mixed()
    .test(
      "fileCount",
      "Puedes subir un máximo de 5 imágenes.",
      (files) => (files as FileList)?.length <= 5
    )
    .test("fileType", "Solo se permiten archivos JPG, PNG y WEBP.", (files) =>
      Array.from(files as FileList).every((file) =>
        ALLOWED_FILE_TYPES.includes(file.type)
      )
    )
    .test("fileSize", "Cada archivo debe pesar menos de 5MB.", (files) =>
      Array.from(files as FileList).every((file) => file.size <= MAX_FILE_SIZE)
    )
    .required("Debes subir al menos una imagen."),
});

type FormData = yup.InferType<typeof formSchema>;

export default function CreateItemForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    trigger,
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

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("stock", data.stock.toString());

    if (data.images) {
      Array.from(data.images as FileList).forEach((file) => {
        formData.append(`images`, file);
      });
    }

    try {
      await createItem(formData);

      toast.success("Item creado", {
        description: "El item se ha creado exitosamente",
      });

      reset();
      setImagePreviews([]);
      navigate("/");
    } catch (error) {
      console.error("Error creando el item:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Por favor intenta nuevamente";
      toast.error("Error al crear item", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setValue("images", files);
      trigger("images");

      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(previews);
    } else {
      setValue("images", new DataTransfer().files);
      trigger("images");
      setImagePreviews([]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            Crear nuevo item
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-1.5">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Nombre del item"
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
                  placeholder="Marca del item"
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

            <div className="space-y-1.5">
              <Label htmlFor="images">
                Imágenes (máx. 5, hasta 5MB cada una)
              </Label>
              <Input
                id="images"
                type="file"
                multiple
                accept={ALLOWED_FILE_TYPES.join(",")} // Establecer tipos aceptados
                onChange={handleImageChange}
              />

              {errors.images && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.images.message}
                </p>
              )}

              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {imagePreviews.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="h-20 w-20 object-cover rounded border"
                      onLoad={() => URL.revokeObjectURL(src)} // Limpiar URLs de objeto
                    />
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear item"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
