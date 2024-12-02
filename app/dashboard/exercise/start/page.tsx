"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, StopCircle, Dumbbell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const exercisesByType = {
  Cardio: {
    Fácil: ["Caminata rápida", "Natación suave", "Ciclismo recreativo"],
    Intermedio: ["Trote", "Saltar la cuerda", "Aeróbicos"],
    Avanzado: ["Sprints", "HIIT", "Carrera de larga distancia"],
  },
  Fuerza: {
    Fácil: ["Sentadillas sin peso", "Flexiones de rodillas", "Plancha"],
    Intermedio: [
      "Sentadillas con peso",
      "Flexiones completas",
      "Dominadas asistidas",
    ],
    Avanzado: ["Peso muerto", "Dominadas", "Press de banca"],
  },
  Flexibilidad: {
    Fácil: [
      "Estiramientos básicos",
      "Yoga para principiantes",
      "Rotación de articulaciones",
    ],
    Intermedio: ["Yoga intermedio", "Pilates", "Estiramientos dinámicos"],
    Avanzado: ["Yoga avanzado", "Contorsión", "Estiramientos profundos"],
  },
};

interface ExerciseLog {
  exercise: string;
  weight?: number;
  reps?: number;
  sets?: number;
  time?: number;
  distance?: number;
}

export default function StartExercisePage() {
  const [selectedType, setSelectedType] = useState<
    keyof typeof exercisesByType | "Personalizado" | null
  >(null);
  const [difficulty, setDifficulty] = useState("Fácil");
  const [searchTerm, setSearchTerm] = useState("");
  const [customExercises, setCustomExercises] = useState<string[]>([]);
  const [currentExercise, setCurrentExercise] = useState("");
  const [exerciseConfig, setExerciseConfig] = useState({
    time: 0,
    sets: 1,
    reps: 0,
    weight: 0,
    distance: 0,
  });
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [currentRep, setCurrentRep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [distanceCovered, setDistanceCovered] = useState(0);
  const [todaysExercises, setTodaysExercises] = useState<ExerciseLog[]>([]);

  const isCardio = selectedType === "Cardio";

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isStarted && !isPaused && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        if (isCardio) {
          const distancePerSecond =
            exerciseConfig.distance / exerciseConfig.time;
          setDistanceCovered((prev) =>
            Math.min(prev + distancePerSecond, exerciseConfig.distance)
          );
        }
      }, 1000);
    } else if (
      timeLeft === 0 &&
      !isCardio &&
      currentRep < exerciseConfig.reps
    ) {
      setCurrentRep(currentRep + 1);
      setTimeLeft(exerciseConfig.time);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isPaused, currentRep, exerciseConfig, isStarted, isCardio]);

  const handleTypeSelect = (
    type: keyof typeof exercisesByType | "Personalizado"
  ) => {
    setSelectedType(type);
    setSearchTerm("");
    setCustomExercises([]);
    setCurrentExercise("");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm && !customExercises.includes(searchTerm)) {
      setCustomExercises([...customExercises, searchTerm]);
      setCurrentExercise(searchTerm);
      setSearchTerm("");
    }
  };

  const handleExerciseSelect = (exercise: string) => {
    setCurrentExercise(exercise);
    setExerciseConfig({
      time: 30,
      sets: isCardio ? 1 : 3,
      reps: isCardio ? 0 : 10,
      weight: 0,
      distance: isCardio ? 1000 : 0, // 1km por defecto para cardio
    });
  };

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExerciseConfig({ ...exerciseConfig, [name]: parseInt(value) || 0 });
  };

  const handleStart = () => {
    if (
      currentExercise &&
      ((isCardio && exerciseConfig.time > 0 && exerciseConfig.distance > 0) ||
        (!isCardio && exerciseConfig.sets > 0 && exerciseConfig.reps > 0))
    ) {
      setIsStarted(true);
      setIsPaused(false);
      setTimeLeft(exerciseConfig.time);
      setCurrentSet(1);
      setCurrentRep(0);
      setDistanceCovered(0);
    } else {
      alert(
        "Configuración Incompleta: Por favor, configura correctamente el ejercicio."
      );
    }
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsStarted(false);
    setCurrentSet(1);
    setCurrentRep(0);
    setTimeLeft(0);
    setDistanceCovered(0);
    addExerciseToLog();
  };

  const handleComplete = () => {
    if (!isCardio && currentSet < exerciseConfig.sets) {
      setCurrentSet(currentSet + 1);
      setCurrentRep(0);
      setTimeLeft(exerciseConfig.time);
    } else {
      handleStop();
    }
  };

  const addExerciseToLog = () => {
    const newExercise: ExerciseLog = {
      exercise: currentExercise,
      time: exerciseConfig.time - timeLeft,
    };
    if (isCardio) {
      newExercise.distance = distanceCovered;
    } else {
      newExercise.sets = currentSet;
      newExercise.reps = exerciseConfig.reps;
      if (exerciseConfig.weight > 0) newExercise.weight = exerciseConfig.weight;
    }
    setTodaysExercises([...todaysExercises, newExercise]);
  };

  const finishWorkout = () => {
    handleStop();
    alert(
      "Entrenamiento Terminado: Tu entrenamiento ha sido guardado correctamente."
    );
    setTimeout(() => {
      setTodaysExercises([]);
      setCurrentExercise("");
      setExerciseConfig({ time: 0, sets: 1, reps: 0, weight: 0, distance: 0 });
    }, 100);
  };

  const renderExerciseList = () => {
    if (selectedType === "Personalizado") {
      return (
        <>
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <Input
              type="text"
              placeholder="Buscar ejercicio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit">Agregar</Button>
          </form>
          <ul className="space-y-2">
            {customExercises.map((exercise, index) => (
              <li
                key={index}
                className="bg-muted p-2 rounded-md flex justify-between items-center"
              >
                {exercise}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExerciseSelect(exercise)}
                >
                  Seleccionar
                </Button>
              </li>
            ))}
          </ul>
        </>
      );
    } else if (selectedType && selectedType in exercisesByType) {
      return (
        <>
          <Select onValueChange={setDifficulty} defaultValue={difficulty}>
            <SelectTrigger className="mb-4">
              <SelectValue placeholder="Selecciona la dificultad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fácil">Fácil</SelectItem>
              <SelectItem value="Intermedio">Intermedio</SelectItem>
              <SelectItem value="Avanzado">Avanzado</SelectItem>
            </SelectContent>
          </Select>
          <ul className="space-y-2">
            {selectedType &&
              exercisesByType[selectedType][
                difficulty as keyof (typeof exercisesByType)["Cardio"]
              ].map((exercise, index) => (
                <li
                  key={index}
                  className="bg-muted p-2 rounded-md flex justify-between items-center"
                >
                  {exercise}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExerciseSelect(exercise)}
                  >
                    Seleccionar
                  </Button>
                </li>
              ))}
          </ul>
        </>
      );
    }
    return null;
  };

  const renderExerciseProgress = () => {
    const progressPercentage = isCardio
      ? (distanceCovered / exerciseConfig.distance) * 100
      : (currentRep / exerciseConfig.reps) * 100;

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold">
            {isCardio
              ? "Progreso"
              : `Serie ${currentSet} de ${exerciseConfig.sets}`}
          </h3>
          <p className="text-xl">
            {isCardio
              ? `${distanceCovered.toFixed(2)}m / ${exerciseConfig.distance}m`
              : `Repetición ${currentRep} de ${exerciseConfig.reps}`}
          </p>
        </div>
        <Progress value={progressPercentage} className="w-full" />
        <div className="text-center text-3xl font-bold">{timeLeft}s</div>
        {((isCardio && distanceCovered >= exerciseConfig.distance) ||
          (!isCardio && currentRep === exerciseConfig.reps)) && (
          <Button onClick={handleComplete} className="w-full">
            {isCardio || currentSet === exerciseConfig.sets
              ? "Finalizar Ejercicio"
              : "Siguiente Serie"}
          </Button>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Empezar Entrenamiento
        </h2>

        {!isStarted && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Selecciona un Tipo de Entrenamiento</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button onClick={() => handleTypeSelect("Cardio")}>Cardio</Button>
              <Button onClick={() => handleTypeSelect("Fuerza")}>Fuerza</Button>
              <Button onClick={() => handleTypeSelect("Flexibilidad")}>
                Flexibilidad
              </Button>
              <Button onClick={() => handleTypeSelect("Personalizado")}>
                Personalizado
              </Button>
            </CardContent>
          </Card>
        )}

        {selectedType && !isStarted && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Lista de Ejercicios - {selectedType}</CardTitle>
              {selectedType === "Personalizado" ? (
                <Search className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {renderExerciseList()}
            </CardContent>
          </Card>
        )}

        {currentExercise && !isStarted && (
          <Card>
            <CardHeader>
              <CardTitle>Configurar Ejercicio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-exercise">Ejercicio Actual</Label>
                  <Input
                    id="current-exercise"
                    value={currentExercise}
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor="time">Tiempo (segundos)</Label>
                  <Input
                    id="time"
                    name="time"
                    type="number"
                    value={exerciseConfig.time}
                    onChange={handleConfigChange}
                    min={0}
                  />
                </div>
                {isCardio ? (
                  <div>
                    <Label htmlFor="distance">Distancia (metros)</Label>
                    <Input
                      id="distance"
                      name="distance"
                      type="number"
                      value={exerciseConfig.distance}
                      onChange={handleConfigChange}
                      min={0}
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="sets">Series</Label>
                      <Input
                        id="sets"
                        name="sets"
                        type="number"
                        value={exerciseConfig.sets}
                        onChange={handleConfigChange}
                        min={1}
                      />
                    </div>
                    <div>
                      <Label htmlFor="reps">Repeticiones</Label>
                      <Input
                        id="reps"
                        name="reps"
                        type="number"
                        value={exerciseConfig.reps}
                        onChange={handleConfigChange}
                        min={0}
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Peso (kg)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        value={exerciseConfig.weight}
                        onChange={handleConfigChange}
                        min={0}
                      />
                    </div>
                  </>
                )}
                <Button onClick={handleStart} className="w-full">
                  Iniciar Ejercicio
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {isStarted && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>{currentExercise}</CardTitle>
              <div className="space-x-2">
                <button onClick={handlePause}>
                  {isPaused ? (
                    <Play className="h-6 w-6" />
                  ) : (
                    <Pause className="h-6 w-6" />
                  )}
                </button>
                <button onClick={handleStop}>
                  <StopCircle className="h-6 w-6" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {renderExerciseProgress()}
            </CardContent>
          </Card>
        )}

        {todaysExercises.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Entrenamiento de Hoy</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {todaysExercises.map((exercise, index) => (
                  <li key={index} className="bg-muted p-2 rounded-md">
                    {exercise.exercise} -
                    {exercise.time && `Tiempo: ${exercise.time}s`}
                    {exercise.distance &&
                      ` - Distancia: ${exercise.distance.toFixed(2)}m`}
                    {exercise.sets && ` - ${exercise.sets} series`}
                    {exercise.reps && ` x ${exercise.reps} repeticiones`}
                    {exercise.weight && ` - Peso: ${exercise.weight}kg`}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {todaysExercises.length > 0 && (
          <Button onClick={finishWorkout} className="w-full">
            Terminar Entrenamiento
          </Button>
        )}
      </div>
    </>
  );
}
