'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface CalorieGoalProps {
  calorieGoal: number;
  setCalorieGoal: (goal: number) => void;
}

const CalorieGoal = ({ calorieGoal, setCalorieGoal }: CalorieGoalProps) => {
  const [tempGoal, setTempGoal] = useState("");
  const { toast } = useToast();

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempGoal(e.target.value);
  };

  const handleSaveGoal = () => {
    const newGoal = parseInt(tempGoal, 10);
    if (!isNaN(newGoal) && newGoal > 0) {
      setCalorieGoal(newGoal);
      toast({
        title: "Objetivo calórico actualizado",
        description: `Tu nuevo objetivo calórico diario es ${newGoal} calorías.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Por favor, ingresa un número válido mayor que cero.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Objetivo Calórico Diario</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="calorie-goal">Calorías diarias</Label>
            <div className="flex space-x-2">
              <Input
                id="calorie-goal"
                type="number"
                value={tempGoal}
                onChange={handleGoalChange}
                placeholder="Calorías diarias"
                min="1"
              />
              <Button onClick={handleSaveGoal}>Guardar</Button>
            </div>
          </div>
          <p>Tu objetivo calórico actual es: {calorieGoal} calorías</p>
        </div>
      </CardContent>
    </Card>
  );
};

interface Food {
  name: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

interface FoodDatabaseProps {
  onSelectFood: (food: Food) => void;
}

const FoodDatabase = ({ onSelectFood }: FoodDatabaseProps) => {
  const foodList: Food[] = [
    { name: "Manzana", calories: 95, proteins: 0.5, carbs: 25, fats: 0.3 },
    { name: "Pollo", calories: 165, proteins: 31, carbs: 0, fats: 3.6 },
    { name: "Arroz", calories: 206, proteins: 4.3, carbs: 45, fats: 0.4 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Base de Datos de Alimentos</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {foodList.map((food, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{food.name} - {food.calories} calorías</span>
              <Button variant="outline" size="sm" onClick={() => onSelectFood(food)}>
                Seleccionar
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default function AddFoodPage() {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [dailyCalorieLimit, setDailyCalorieLimit] = useState(2000); 
  const [totalCaloriesConsumed, setTotalCaloriesConsumed] = useState(0);
  const [frequentMeals, setFrequentMeals] = useState<Food[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setTotalCaloriesConsumed(1500);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCalories = parseInt(calories);
      const newTotalCalories = totalCaloriesConsumed + newCalories;
      
      console.log("Alimento agregado:", { foodName, calories: newCalories, protein, carbs, fat });
      
      setTotalCaloriesConsumed(newTotalCalories);

      toast({
        title: "Alimento agregado",
        description: `${foodName} ha sido agregado a tu base de datos personal.`,
      });

      if (newTotalCalories > dailyCalorieLimit) {
        toast({
          title: "¡Alerta de calorías!",
          description: `Has superado tu límite diario de calorías (${dailyCalorieLimit} kcal). Consumo actual: ${newTotalCalories} kcal.`,
          variant: "destructive",
        });
      }

      setFoodName("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setFat("");
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo agregar el alimento. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  const handleSelectFood = (food: Food) => {
    setFoodName(food.name);
    setCalories(food.calories.toString());
    setProtein(food.proteins.toString());
    setCarbs(food.carbs.toString());
    setFat(food.fats.toString());
  };

  const handleSaveFrequentMeal = () => {
    if (foodName && calories) {
      const newFrequentMeal: Food = {
        name: foodName,
        calories: parseInt(calories),
        proteins: parseFloat(protein) || 0,
        carbs: parseFloat(carbs) || 0,
        fats: parseFloat(fat) || 0,
      };
      setFrequentMeals([...frequentMeals, newFrequentMeal]);
      toast({
        title: "Comida frecuente guardada",
        description: `${foodName} ha sido agregada a tus comidas frecuentes.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Por favor, ingresa al menos el nombre y las calorías de la comida.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Agregar Comida</h2>
      </div>
      
      <CalorieGoal calorieGoal={dailyCalorieLimit} setCalorieGoal={setDailyCalorieLimit} />

      <FoodDatabase onSelectFood={handleSelectFood} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Detalles de la Comida</CardTitle>
          <Plus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="food-name">Nombre de la Comida</Label>
              <Input 
                id="food-name" 
                placeholder="Ej: Ensalada César" 
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories">Calorías (kcal)</Label>
              <Input 
                id="calories" 
                type="number" 
                placeholder="Ej: 300" 
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="protein">Proteínas (g)</Label>
              <Input 
                id="protein" 
                type="number" 
                placeholder="Ej: 10" 
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="carbs">Carbohidratos (g)</Label>
              <Input 
                id="carbs" 
                type="number" 
                placeholder="Ej: 30" 
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fat">Grasas (g)</Label>
              <Input 
                id="fat" 
                type="number" 
                placeholder="Ej: 15" 
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                required
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit">Agregar Comida</Button>
              <Button type="button" variant="outline" onClick={handleSaveFrequentMeal}>
                <Star className="mr-2 h-4 w-4" />
                Guardar como Frecuente
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}