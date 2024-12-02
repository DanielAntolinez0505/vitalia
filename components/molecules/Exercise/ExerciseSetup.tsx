import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ExerciseSetupProps {
  exerciseConfig: {
    time: number;
    sets: number;
    reps: number;
  };
  setExerciseConfig: (config: {
    time: number;
    sets: number;
    reps: number;
  }) => void;
  onStart: () => void;
}

export default function ExerciseSetup({
  exerciseConfig,
  setExerciseConfig,
  onStart,
}: ExerciseSetupProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExerciseConfig({ ...exerciseConfig, [name]: parseInt(value) || 0 });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="time">Tiempo (segundos)</Label>
          <Input
            id="time"
            name="time"
            type="number"
            value={exerciseConfig.time}
            onChange={handleChange}
            min={0}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sets">Series</Label>
          <Input
            id="sets"
            name="sets"
            type="number"
            value={exerciseConfig.sets}
            onChange={handleChange}
            min={1}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reps">Repeticiones</Label>
          <Input
            id="reps"
            name="reps"
            type="number"
            value={exerciseConfig.reps}
            onChange={handleChange}
            min={0}
          />
        </div>
      </div>
      <Button onClick={onStart} className="w-full">
        Iniciar Entrenamiento
      </Button>
    </div>
  );
}
