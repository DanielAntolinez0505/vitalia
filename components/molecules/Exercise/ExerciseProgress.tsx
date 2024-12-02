import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface ExerciseProgressProps {
  exerciseConfig: {
    time: number;
    sets: number;
    reps: number;
  };
  currentSet: number;
  currentRep: number;
  setCurrentRep: (rep: number) => void;
  isPaused: boolean;
  onComplete: () => void;
}

export default function ExerciseProgress({
  exerciseConfig,
  currentSet,
  currentRep,
  setCurrentRep,
  isPaused,
  onComplete,
}: ExerciseProgressProps) {
  const [timeLeft, setTimeLeft] = useState(exerciseConfig.time);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isPaused && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && currentRep < exerciseConfig.reps) {
      setCurrentRep(currentRep + 1);
      setTimeLeft(exerciseConfig.time);
    }
    return () => clearTimeout(timer);
  }, [
    timeLeft,
    isPaused,
    currentRep,
    exerciseConfig.reps,
    exerciseConfig.time,
    setCurrentRep,
  ]);

  const progressPercentage = (currentRep / exerciseConfig.reps) * 100;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold">
          Serie {currentSet} de {exerciseConfig.sets}
        </h3>
        <p className="text-xl">
          Repetición {currentRep} de {exerciseConfig.reps}
        </p>
      </div>
      <Progress value={progressPercentage} className="w-full" />
      <div className="text-center text-3xl font-bold">{timeLeft}s</div>
      {currentRep === exerciseConfig.reps && (
        <Button onClick={onComplete} className="w-full">
          {currentSet === exerciseConfig.sets
            ? "Finalizar Entrenamiento"
            : "Siguiente Serie"}
        </Button>
      )}
    </div>
  );
}
