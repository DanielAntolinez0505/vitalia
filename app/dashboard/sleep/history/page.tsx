"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface SleepEntry {
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  quality: "Buena" | "Regular" | "Mala";
}

const sleepData: SleepEntry[] = [
  { date: "2023-05-01", startTime: "23:00", endTime: "07:00", duration: 8, quality: "Buena" },
  { date: "2023-05-02", startTime: "23:30", endTime: "06:30", duration: 7, quality: "Regular" },
  { date: "2023-05-03", startTime: "22:45", endTime: "06:45", duration: 8, quality: "Buena" },
  { date: "2023-05-04", startTime: "00:15", endTime: "07:15", duration: 7, quality: "Mala" },
  { date: "2023-05-05", startTime: "23:15", endTime: "07:30", duration: 8.25, quality: "Buena" },
  { date: "2023-05-06", startTime: "22:30", endTime: "06:30", duration: 8, quality: "Regular" },
  { date: "2023-05-07", startTime: "23:45", endTime: "07:45", duration: 8, quality: "Buena" },
];

const SleepHistory: React.FC = () => {
  const averageSleepDuration = sleepData.reduce((acc, entry) => acc + entry.duration, 0) / sleepData.length;
  const goodSleepNights = sleepData.filter(entry => entry.quality === "Buena").length;

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "Buena": return "bg-green-500";
      case "Regular": return "bg-yellow-500";
      case "Mala": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Resumen de Sueño</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-lg font-semibold">Promedio de horas de sueño:</p>
              <p className="text-3xl font-bold">{averageSleepDuration.toFixed(2)} horas</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Noches con buen sueño:</p>
              <p className="text-3xl font-bold">{goodSleepNights} de {sleepData.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Sueño</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Hora de inicio</TableHead>
                <TableHead>Hora de fin</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead>Calidad</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sleepData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.startTime}</TableCell>
                  <TableCell>{entry.endTime}</TableCell>
                  <TableCell>{entry.duration} horas</TableCell>
                  <TableCell>
                    <Badge className={getQualityColor(entry.quality)}>
                      {entry.quality}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SleepHistory;