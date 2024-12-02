"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

// Datos ficticios de usuarios
const usersData: User[] = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@example.com",
    role: "Admin",
    status: "Activo",
  },
  {
    id: 2,
    name: "María García",
    email: "maria@example.com",
    role: "Usuario",
    status: "Inactivo",
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    role: "Editor",
    status: "Activo",
  },
  {
    id: 4,
    name: "Ana Martínez",
    email: "ana@example.com",
    role: "Usuario",
    status: "Activo",
  },
  {
    id: 5,
    name: "Pedro Sánchez",
    email: "pedro@example.com",
    role: "Admin",
    status: "Inactivo",
  },
  {
    id: 6,
    name: "Laura Fernández",
    email: "laura@example.com",
    role: "Editor",
    status: "Activo",
  },
  {
    id: 7,
    name: "Miguel González",
    email: "miguel@example.com",
    role: "Usuario",
    status: "Activo",
  },
  {
    id: 8,
    name: "Isabel López",
    email: "isabel@example.com",
    role: "Usuario",
    status: "Inactivo",
  },
  {
    id: 9,
    name: "David Torres",
    email: "david@example.com",
    role: "Editor",
    status: "Activo",
  },
  {
    id: 10,
    name: "Carmen Ruiz",
    email: "carmen@example.com",
    role: "Admin",
    status: "Activo",
  },
  {
    id: 11,
    name: "Javier Moreno",
    email: "javier@example.com",
    role: "Usuario",
    status: "Inactivo",
  },
  {
    id: 12,
    name: "Elena Díaz",
    email: "elena@example.com",
    role: "Editor",
    status: "Activo",
  },
];

export default function UserAdministrationPage() {
  const [users, setUsers] = useState<User[]>(usersData);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const usersPerPage = 5;

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (user: User) => {
    // Lógica para editar usuario
    console.log("Editar usuario:", user);
  };

  const handleToggleVisibility = (user: User) => {
    const updatedUsers = users.map((u) =>
      u.id === user.id
        ? { ...u, status: u.status === "Activo" ? "Inactivo" : "Activo" }
        : u
    );
    setUsers(updatedUsers);
  };

  const handleDelete = (user: User) => {
    const updatedUsers = users.filter((u) => u.id !== user.id);
    setUsers(updatedUsers);
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Administración de Usuarios</h1>
      <Input
        type="text"
        placeholder="Buscar usuarios..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user) => (
            <TableRow
              key={user.id}
              onClick={() => handleUserClick(user)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(user);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleVisibility(user);
                    }}
                  >
                    {user.status === "Activo" ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Esto eliminará
                          permanentemente la cuenta de usuario y eliminará sus
                          datos de nuestros servidores.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(user)}>
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" /> Anterior
        </Button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles del Usuario</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedUser.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Rol:</strong> {selectedUser.role}
                </p>
                <p>
                  <strong>Estado:</strong> {selectedUser.status}
                </p>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
