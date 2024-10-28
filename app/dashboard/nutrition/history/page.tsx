import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export default function NutritionHistoryPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Historial de Alimentación
        </h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Registro de Comidas</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Implement table or list of registered meals */}
          <p>Implementar lista de comidas registradas</p>
        </CardContent>
      </Card>
    </div>
  );
}
