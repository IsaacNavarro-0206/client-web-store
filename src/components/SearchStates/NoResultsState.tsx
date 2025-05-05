import { Card, CardContent } from "@/components/ui/card";

interface NoResultsStateProps {
  query: string;
}

const NoResultsState = ({ query }: NoResultsStateProps) => {
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
};

export default NoResultsState;
