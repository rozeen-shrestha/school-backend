"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data.data.users || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    console.log('Edit user:', userId);
    // Implement edit logic
  };

  const handleDelete = (userId) => {
    console.log('Delete user:', userId);
    // Implement delete logic
  };

  return (
    <div className="h-full w-full p-8 space-y-8 bg-card">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Manage Users</h2>
        <p className="text-muted-foreground">
          View, edit, or delete user accounts.
        </p>
      </div>

      <Card className="bg-background">
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            ) : users.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-2">Username</th>
                    <th className="border-b p-2">Email</th>
                    <th className="border-b p-2">Role</th>
                    <th className="border-b p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-muted/50 transition-colors">
                      <td className="border-b p-2">{user.username}</td>
                      <td className="border-b p-2">{user.email}</td>
                      <td className="border-b p-2 capitalize">{user.role}</td>
                      <td className="border-b p-2 space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(user._id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(user._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted-foreground text-center py-4">No users available</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
