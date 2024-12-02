'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, ChevronDown, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

const recipes = [
  {
    id: 1,
    name: "Ensalada de quinoa y vegetales",
    calories: 350,
    protein: 12,
    carbs: 45,
    fat: 15,
    ingredients: ["Quinoa", "Espinacas", "Tomate cherry", "Pepino", "Aceite de oliva", "Limón"],
    instructions: "1. Cocina la quinoa según las instrucciones del paquete. 2. Mezcla con los vegetales picados. 3. Aliña con aceite de oliva y jugo de limón.",
    goal: "pérdida de peso"
  },
  {
    id: 2,
    name: "Batido de proteínas con plátano y mantequilla de maní",
    calories: 400,
    protein: 30,
    carbs: 40,
    fat: 15,
    ingredients: ["Plátano", "Leche de almendras", "Proteína en polvo", "Mantequilla de maní"],
    instructions: "1. Mezcla todos los ingredientes en una licuadora. 2. Licúa hasta obtener una consistencia suave.",
    goal: "ganancia de músculo"
  },
  {
    id: 3,
    name: "Bowl de avena con frutas y nueces",
    calories: 450,
    protein: 15,
    carbs: 65,
    fat: 20,
    ingredients: ["Avena", "Leche", "Manzana", "Arándanos", "Nueces", "Miel"],
    instructions: "1. Cocina la avena con leche. 2. Agrega las frutas picadas y las nueces. 3. Endulza con un poco de miel.",
    goal: "mantenimiento"
  }
]

export default function RecipesPage() {
  const [selectedGoal, setSelectedGoal] = useState("todos")
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null)
  const [dietaryPreferences, setDietaryPreferences] = useState("")
  const [allergies, setAllergies] = useState("")
  const { toast } = useToast()

  const filteredRecipes = selectedGoal === "todos" 
    ? recipes 
    : recipes.filter(recipe => recipe.goal === selectedGoal)

  const handlePreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Dietary Preferences:", dietaryPreferences)
    console.log("Allergies:", allergies)
    toast({
      title: "Preferencias guardadas",
      description: "Tus preferencias alimenticias y alergias han sido registradas.",
    })
    setDietaryPreferences("")
    setAllergies("")
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Recetas Saludables
        </h2>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Preferencias Alimenticias y Alergias</CardTitle>
          <Plus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePreferencesSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dietary-preferences">Preferencias Alimenticias</Label>
              <Input
                id="dietary-preferences"
                placeholder="Ej: Vegetariano, Bajo en carbohidratos"
                value={dietaryPreferences}
                onChange={(e) => setDietaryPreferences(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="allergies">Alergias</Label>
              <Input
                id="allergies"
                placeholder="Ej: Nueces, Lácteos"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
              />
            </div>
            <Button type="submit">Guardar Preferencias</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Recetas Recomendadas</CardTitle>
          <Book className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select onValueChange={setSelectedGoal} defaultValue={selectedGoal}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona un objetivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los objetivos</SelectItem>
                <SelectItem value="pérdida de peso">Pérdida de peso</SelectItem>
                <SelectItem value="ganancia de músculo">Ganancia de músculo</SelectItem>
                <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            {filteredRecipes.map((recipe) => (
              <Collapsible
                key={recipe.id}
                open={expandedRecipe === recipe.id}
                onOpenChange={() => setExpandedRecipe(expandedRecipe === recipe.id ? null : recipe.id)}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>{recipe.name}</CardTitle>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </CardHeader>
                  <CardContent>
                    <p>Calorías: {recipe.calories} | Proteínas: {recipe.protein}g | Carbohidratos: {recipe.carbs}g | Grasas: {recipe.fat}g</p>
                    <CollapsibleContent className="space-y-2">
                      <div className="mt-4">
                        <h4 className="font-semibold">Ingredientes:</h4>
                        <ul className="list-disc list-inside">
                          {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold">Instrucciones:</h4>
                        <p>{recipe.instructions}</p>
                      </div>
                    </CollapsibleContent>
                  </CardContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}