"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  birthday: string;
  isActive: boolean;
  role: string;
}

const ProfileSettings: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    isActive: true,
    role: "Usuario",
  });

  const [activities] = useState([
    "Inicio de sesión el 15/11/2024",
    "Cambio de correo electrónico el 14/11/2024",
    "Actualización de perfil el 13/11/2024",
  ]);

  const [isResettingPassword, setIsResettingPassword] =
    useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Cambios guardados",
      description: "Los cambios en tu perfil han sido guardados exitosamente.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Cuenta eliminada",
      description: "Tu cuenta ha sido eliminada permanentemente.",
      variant: "destructive",
    });
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword) {
      toast({
        title: "Contraseña restablecida",
        description: "Tu contraseña ha sido restablecida exitosamente.",
      });
      setIsResettingPassword(false);
    } else {
      toast({
        title: "Error",
        description: "Por favor ingrese una nueva contraseña.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/default-profile.png" alt="Foto de perfil" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="mt-2">
              Cambiar foto
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre:</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico:</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono:</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthday">Fecha de Cumpleaños:</Label>
              <Input
                type="date"
                id="birthday"
                name="birthday"
                value={profile.birthday}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={profile.isActive}
                onCheckedChange={(checked: any) =>
                  setProfile({ ...profile, isActive: checked })
                }
              />
              <Label htmlFor="isActive">Cuenta Activa</Label>
            </div>

            <Button type="submit">Guardar Cambios</Button>
          </form>

          <div className="mt-6">
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Eliminar Cuenta
            </Button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              Historial de Actividad:
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>

          {isResettingPassword ? (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Restablecer Contraseña</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nueva Contraseña:</Label>
                    <Input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit">Restablecer Contraseña</Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Button
              onClick={() => setIsResettingPassword(true)}
              className="mt-4"
              variant="secondary"
            >
              Restablecer Contraseña
            </Button>
          )}
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default ProfileSettings;
