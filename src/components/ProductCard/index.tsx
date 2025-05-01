import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import StarRating from "../StarRating";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden h-3/4 flex flex-col hover:shadow-md transition-shadow">
      <Link to={`/items/${product._id}`} className="overflow-hidden">
        <div className="aspect-square relative overflow-hidden">
          <img
            src="/placeholder.svg"
            alt={product.title}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
        </div>
      </Link>

      <CardContent className="flex-grow p-4">
        <div className="space-y-1">
          <Link to={`/items/${product._id}`} className="hover:underline">
            <h3 className="font-semibold line-clamp-1">{product.title}</h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-2 flex items-center">
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground ml-2">
            ({product.rating.toFixed(1)})
          </span>
        </div>

        <div className="mt-2">
          <span className="text-sm text-muted-foreground capitalize">
            {product.category}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="font-semibold">${product.price.toFixed(2)}</div>
        <Button size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Agregar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
