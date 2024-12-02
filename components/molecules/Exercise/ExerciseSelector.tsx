import { Button } from "@/components/ui/button";

interface ExerciseSelectorProps {
  selectedExercise: string;
  setSelectedExercise: (exercise: string) => void;
}

export default function ExerciseSelector({
  selectedExercise,
  setSelectedExercise,
}: ExerciseSelectorProps) {
  const exercises = ["Cardio", "Fuerza", "Flexibilidad", "Personalizado"];

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">
        Selecciona un Tipo de Entrenamiento
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {exercises.map((exercise) => (
          <Button
            key={exercise}
            variant={selectedExercise === exercise ? "default" : "outline"}
            onClick={() => setSelectedExercise(exercise)}
          >
            {exercise}
          </Button>
        ))}
      </div>
    </div>
  );
}
