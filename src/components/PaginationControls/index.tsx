import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLimitChange = (value: string) => {
    onLimitChange(parseInt(value, 10));
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">
          Resultados por página:
        </span>

        <Select value={limit.toString()} onValueChange={handleLimitChange}>
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder={limit} />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">
          Página {currentPage} de {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage <= 1}
        >
          <ChevronLeft />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentPage >= totalPages}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;
