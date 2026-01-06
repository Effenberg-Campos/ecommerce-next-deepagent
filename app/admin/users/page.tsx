'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, User as UserIcon, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  createdAt: string;
  _count?: {
    orders: number;
  };
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }
    if (status === 'authenticated') {
      const userRole = (session?.user as any)?.role;
      if (userRole !== 'ADMIN') {
        router.push('/');
        return;
      }
      fetchUsers();
    }
  }, [status, session, router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'ADMIN' ? 'CUSTOMER' : 'ADMIN';
    
    if (!confirm(`¿Cambiar rol a ${newRole}?`)) return;

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        toast.success('Rol actualizado');
        fetchUsers();
      } else {
        toast.error('Error al actualizar rol');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al actualizar rol');
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push('/admin')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
            <h1 className="text-4xl font-bold text-foreground">Gestionar Usuarios</h1>
          </div>
          <Button
            onClick={() => router.push('/admin/users/new')}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Añadir Usuario
          </Button>
        </div>

        <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Usuario
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Rol
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Órdenes
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Fecha Registro
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users?.map?.((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <UserIcon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">
                          {user.name || 'Sin nombre'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'ADMIN'
                            ? 'bg-purple-500/15 text-purple-400'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        {user.role === 'ADMIN' ? (
                          <Shield className="h-3 w-3" />
                        ) : (
                          <UserIcon className="h-3 w-3" />
                        )}
                        {user.role === 'ADMIN' ? 'Admin' : 'Cliente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-foreground">
                      {user?._count?.orders ?? 0}
                    </td>
                    <td className="px-6 py-4 text-foreground">
                      {new Date(user.createdAt).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        onClick={() => toggleRole(user.id, user.role)}
                        size="sm"
                        variant="outline"
                      >
                        Cambiar a {user.role === 'ADMIN' ? 'Cliente' : 'Admin'}
                      </Button>
                    </td>
                  </motion.tr>
                )) || null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
