import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddFoodPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Agregar Comida</h2>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Detalles de la Comida</CardTitle>
          <Plus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="food-name">Nombre de la Comida</Label>
              <Input id="food-name" placeholder="Ej: Ensalada César" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories">Calorías</Label>
              <Input id="calories" type="number" placeholder="Ej: 300" />
            </div>
            <Button type="submit">Agregar Comida</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
