import { Card, CardContent } from "@/components/ui/card";

interface ErrorStateProps {
  error: string;
}

const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <p className="text-destructive text-center">{error}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorState;
