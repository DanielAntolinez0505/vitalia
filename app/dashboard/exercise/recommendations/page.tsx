import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Dumbbell, Calendar } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const exerciseTips = [
  "Mantén una buena hidratación antes, durante y después del ejercicio.",
  "Realiza un calentamiento adecuado para prevenir lesiones.",
  "Escucha a tu cuerpo y descansa cuando sea necesario.",
  "Combina ejercicios cardiovasculares y de fuerza para un entrenamiento equilibrado.",
  "Mantén una dieta balanceada para complementar tu rutina de ejercicios.",
];

const recommendedRoutines = [
  {
    title: "Rutina de Fuerza para Principiantes",
    description: "Ideal para quienes comienzan con el entrenamiento de fuerza.",
    exercises: ["Sentadillas", "Flexiones", "Peso muerto", "Plancha"],
    difficulty: "Principiante",
  },
  {
    title: "Cardio de Alto Impacto",
    description:
      "Perfecto para quemar calorías y mejorar la resistencia cardiovascular.",
    exercises: ["Burpees", "Saltos de tijera", "Mountain climbers", "Sprints"],
    difficulty: "Intermedio",
  },
  {
    title: "Yoga para Flexibilidad",
    description:
      "Mejora tu flexibilidad y reduce el estrés con esta rutina de yoga.",
    exercises: [
      "Postura del perro boca abajo",
      "Guerrero I",
      "Postura del árbol",
      "Saludo al sol",
    ],
    difficulty: "Todos los niveles",
  },
];

const exerciseOfTheDay = {
  name: "Plancha con Rotación",
  description: "Fortalece tu core y mejora la estabilidad con este ejercicio.",
  steps: [
    "Comienza en posición de plancha con los brazos extendidos.",
    "Gira tu cuerpo hacia un lado, levantando el brazo hacia el techo.",
    "Mantén la posición por un segundo y vuelve a la posición inicial.",
    "Repite hacia el otro lado.",
    "Realiza 10-15 repeticiones por cada lado.",
  ],
};

export default function ExerciseRecommendationsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Recomendaciones de Ejercicio
        </h2>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Consejos Generales</CardTitle>
          <Lightbulb className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {exerciseTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Rutinas Recomendadas</CardTitle>
          <Dumbbell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {recommendedRoutines.map((routine, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>
                  {routine.title}
                  <Badge variant="outline" className="ml-2">
                    {routine.difficulty}
                  </Badge>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">{routine.description}</p>
                  <strong>Ejercicios:</strong>
                  <ul className="list-disc pl-5 mt-2">
                    {routine.exercises.map((exercise, idx) => (
                      <li key={idx}>{exercise}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Ejercicio del Día</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">
            {exerciseOfTheDay.name}
          </h3>
          <p className="mb-4">{exerciseOfTheDay.description}</p>
          <strong>Pasos:</strong>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            {exerciseOfTheDay.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
