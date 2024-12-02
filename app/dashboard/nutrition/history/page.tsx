'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const mockWeeklyData = [
  { day: 'Lunes', calories: 2100 },
  { day: 'Martes', calories: 2300 },
  { day: 'Miércoles', calories: 1900 },
  { day: 'Jueves', calories: 2200 },
  { day: 'Viernes', calories: 2400 },
  { day: 'Sábado', calories: 2600 },
  { day: 'Domingo', calories: 2000 },
]

const mockMeals = [
  { name: 'Desayuno', proteins: 20, carbs: 30, fats: 10 },
  { name: 'Almuerzo', proteins: 30, carbs: 40, fats: 15 },
  { name: 'Cena', proteins: 25, carbs: 35, fats: 12 },
  { name: 'Merienda', proteins: 10, carbs: 20, fats: 5 },
]

interface Meal {
  name: string;
  proteins: number;
  carbs: number;
  fats: number;
}

const MacronutrientBreakdown = ({ meals }: { meals: Meal[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Desglose de Macronutrientes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Comida</TableHead>
              <TableHead>Proteínas (g)</TableHead>
              <TableHead>Carbohidratos (g)</TableHead>
              <TableHead>Grasas (g)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meals.map((meal, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{meal.name}</TableCell>
                <TableCell>{meal.proteins}</TableCell>
                <TableCell>{meal.carbs}</TableCell>
                <TableCell>{meal.fats}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default function NutritionHistoryPage() {
  const [currentWeek, setCurrentWeek] = useState(0)

  const chartData = {
    labels: mockWeeklyData.map(data => data.day),
    datasets: [
      {
        label: 'Calorías consumidas',
        data: mockWeeklyData.map(data => data.calories),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Calorías consumidas por día',
      },
    },
  }

  const totalCalories = mockWeeklyData.reduce((sum, day) => sum + day.calories, 0)
  const averageCalories = Math.round(totalCalories / mockWeeklyData.length)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Historial de Alimentación
        </h2>
      </div>
      
      <MacronutrientBreakdown meals={mockMeals} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Resumen Semanal de Calorías</CardTitle>
          <Utensils className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentWeek(prev => prev - 1)}
              disabled={currentWeek === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Semana anterior</span>
            </Button>
            <span className="font-semibold">Semana {currentWeek + 1}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentWeek(prev => prev + 1)}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Semana siguiente</span>
            </Button>
          </div>
          <div className="h-[300px]">
            <Bar options={chartOptions} data={chartData} />
          </div>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Día</TableHead>
                  <TableHead className="text-right">Calorías</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockWeeklyData.map((day) => (
                  <TableRow key={day.day}>
                    <TableCell>{day.day}</TableCell>
                    <TableCell className="text-right">{day.calories}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-semibold">Total</TableCell>
                  <TableCell className="text-right font-semibold">{totalCalories}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">Promedio diario</TableCell>
                  <TableCell className="text-right font-semibold">{averageCalories}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}