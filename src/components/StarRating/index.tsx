import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
}

const StarRating = ({ rating, max = 5 }: StarRatingProps) => {
  return (
    <div className="flex">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const halfFilled = i === Math.floor(rating) && rating % 1 >= 0.5;

        return (
          <Star
            key={i}
            className={`h-4 w-4 ${
              filled
                ? "fill-primary text-primary"
                : halfFilled
                ? "fill-primary/50 text-primary"
                : "fill-muted text-muted-foreground"
            }`}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
