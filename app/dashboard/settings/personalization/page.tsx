"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface UserPreferences {
  measurementUnit: string;
  privacySettings: {
    profileVisibility: boolean;
    activitySharing: boolean;
  };
  socialMedia: {
    facebook: boolean;
    twitter: boolean;
    instagram: boolean;
  };
  wearableIntegration: string;
}

const UserPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    measurementUnit: "metric",
    privacySettings: {
      profileVisibility: true,
      activitySharing: false,
    },
    socialMedia: {
      facebook: false,
      twitter: false,
      instagram: false,
    },
    wearableIntegration: "none",
  });

  const { toast } = useToast();

  const handleMeasurementUnitChange = (value: string) => {
    setPreferences({ ...preferences, measurementUnit: value });
  };

  const handlePrivacySettingChange = (setting: keyof UserPreferences['privacySettings']) => {
    setPreferences({
      ...preferences,
      privacySettings: {
        ...preferences.privacySettings,
        [setting]: !preferences.privacySettings[setting],
      },
    });
  };

  const handleSocialMediaChange = (platform: keyof UserPreferences['socialMedia']) => {
    setPreferences({
      ...preferences,
      socialMedia: {
        ...preferences.socialMedia,
        [platform]: !preferences.socialMedia[platform],
      },
    });
  };

  const handleWearableIntegrationChange = (value: string) => {
    setPreferences({ ...preferences, wearableIntegration: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Preferencias guardadas",
      description: "Tus preferencias han sido actualizadas correctamente.",
    });
    // Here you would typically send the preferences to your backend
    console.log("Preferences saved:", preferences);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Preferencias de Usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Unidades de Medida</Label>
              <Select
                value={preferences.measurementUnit}
                onValueChange={handleMeasurementUnitChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona las unidades de medida" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Métrico (kg, cm)</SelectItem>
                  <SelectItem value="imperial">Imperial (lb, in)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Configuración de Privacidad</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="profileVisibility"
                  checked={preferences.privacySettings.profileVisibility}
                  onCheckedChange={() => handlePrivacySettingChange('profileVisibility')}
                />
                <Label htmlFor="profileVisibility">Perfil Visible</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="activitySharing"
                  checked={preferences.privacySettings.activitySharing}
                  onCheckedChange={() => handlePrivacySettingChange('activitySharing')}
                />
                <Label htmlFor="activitySharing">Compartir Actividad</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Integración con Redes Sociales</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="facebook"
                    checked={preferences.socialMedia.facebook}
                    onCheckedChange={() => handleSocialMediaChange('facebook')}
                  />
                  <Label htmlFor="facebook">Facebook</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="twitter"
                    checked={preferences.socialMedia.twitter}
                    onCheckedChange={() => handleSocialMediaChange('twitter')}
                  />
                  <Label htmlFor="twitter">Twitter</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="instagram"
                    checked={preferences.socialMedia.instagram}
                    onCheckedChange={() => handleSocialMediaChange('instagram')}
                  />
                  <Label htmlFor="instagram">Instagram</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Integración con Dispositivos Wearables</Label>
              <Select
                value={preferences.wearableIntegration}
                onValueChange={handleWearableIntegrationChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un dispositivo wearable" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Ninguno</SelectItem>
                  <SelectItem value="fitbit">Fitbit</SelectItem>
                  <SelectItem value="applewatch">Apple Watch</SelectItem>
                  <SelectItem value="garmin">Garmin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Guardar Preferencias
            </Button>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default UserPreferences;