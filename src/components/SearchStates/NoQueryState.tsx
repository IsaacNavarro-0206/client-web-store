import { Card, CardContent } from "@/components/ui/card";

const NoQueryState = () => {
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
};

export default NoQueryState;
