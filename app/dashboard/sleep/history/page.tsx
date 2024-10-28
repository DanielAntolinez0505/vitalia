import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon } from "lucide-react";

export default function SleepHistoryPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Historial de Sueño
        </h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Registro de Sueño</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Implement table or chart of sleep patterns */}
          <p>Implementar gráfico de patrones de sueño</p>
        </CardContent>
      </Card>
    </div>
  );
}