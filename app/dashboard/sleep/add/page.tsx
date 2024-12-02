"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BedDouble } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function AddSleepPage() {
  const [sleepStart, setSleepStart] = useState("");
  const [sleepEnd, setSleepEnd] = useState("");
  const [sleepQuality, setSleepQuality] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!sleepStart || !sleepEnd || !sleepQuality) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos.",
        variant: "destructive",
      });
      return;
    }

    const start = new Date(sleepStart);
    const end = new Date(sleepEnd);

    if (end <= start) {
      toast({
        title: "Error",
        description: "La hora de fin debe ser posterior a la hora de inicio.",
        variant: "destructive",
      });
      return;
    }

    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

    toast({
      title: "Registro de sueño agregado",
      description: `Has dormido ${duration.toFixed(2)} horas con una calidad de sueño ${sleepQuality}.`,
    });

    // Here you would typically send the data to your backend
    console.log("Sleep record:", { sleepStart, sleepEnd, sleepQuality, duration });

    // Reset form
    setSleepStart("");
    setSleepEnd("");
    setSleepQuality("");
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Agregar Descanso</h2>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Detalles del Descanso</CardTitle>
          <BedDouble className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sleep-start">Hora de Inicio</Label>
              <Input
                id="sleep-start"
                type="datetime-local"
                value={sleepStart}
                onChange={(e) => setSleepStart(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sleep-end">Hora de Fin</Label>
              <Input
                id="sleep-end"
                type="datetime-local"
                value={sleepEnd}
                onChange={(e) => setSleepEnd(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sleep-quality">Calidad del Sueño</Label>
              <Select value={sleepQuality} onValueChange={setSleepQuality} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la calidad del sueño" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excelente">Excelente</SelectItem>
                  <SelectItem value="Buena">Buena</SelectItem>
                  <SelectItem value="Regular">Regular</SelectItem>
                  <SelectItem value="Mala">Mala</SelectItem>
                  <SelectItem value="Muy mala">Muy mala</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Registrar Descanso</Button>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}