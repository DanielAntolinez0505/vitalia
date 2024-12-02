"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface PaymentInfo {
  bankName: string;
  accountHolder: string;
  expirationDate: string;
  cardNumber: string;
  cardType: string;
  billingAddress: string;
}

const PaymentSettings: React.FC = () => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    bankName: "",
    accountHolder: "",
    expirationDate: "",
    cardNumber: "",
    cardType: "Visa",
    billingAddress: "",
  });

  const { toast } = useToast();

  const handleChange = (name: string, value: string) => {
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Configuración de pago guardada",
      description: "Tu información de pago ha sido actualizada correctamente.",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Pago</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Nombre del Banco</Label>
              <Input
                id="bankName"
                name="bankName"
                value={paymentInfo.bankName}
                onChange={(e) => handleChange("bankName", e.target.value)}
                placeholder="Nombre del banco"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountHolder">Nombre del Titular de la Cuenta</Label>
              <Input
                id="accountHolder"
                name="accountHolder"
                value={paymentInfo.accountHolder}
                onChange={(e) => handleChange("accountHolder", e.target.value)}
                placeholder="Nombre completo del titular"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardType">Tipo de Tarjeta</Label>
              <Select
                value={paymentInfo.cardType}
                onValueChange={(value: string) => handleChange("cardType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo de tarjeta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Visa">Visa</SelectItem>
                  <SelectItem value="MasterCard">MasterCard</SelectItem>
                  <SelectItem value="American Express">American Express</SelectItem>
                  <SelectItem value="Discover">Discover</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Número de Tarjeta</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={(e) => handleChange("cardNumber", e.target.value)}
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength={16}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expirationDate">Fecha de Vencimiento</Label>
              <Input
                type="month"
                id="expirationDate"
                name="expirationDate"
                value={paymentInfo.expirationDate}
                onChange={(e) => handleChange("expirationDate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingAddress">Dirección de Facturación</Label>
              <Input
                id="billingAddress"
                name="billingAddress"
                value={paymentInfo.billingAddress}
                onChange={(e) => handleChange("billingAddress", e.target.value)}
                placeholder="Dirección completa de facturación"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Guardar Información de Pago
            </Button>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default PaymentSettings;