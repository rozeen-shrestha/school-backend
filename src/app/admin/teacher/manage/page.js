'use client'
import React, { useState, useEffect } from 'react';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Fuse from 'fuse.js';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';

const TeacherAdminPanel = () => {
    const router = useRouter();
  const [teachers, setTeachers] = useState([]);  // Initialize as empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch('/api/teachers');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      // Ensure data is an array before setting state
      setTeachers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setTeachers([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Safe subjects calculation with null check
  const subjects = Array.isArray(teachers)
    ? [...new Set(teachers.map(teacher => teacher?.subject).filter(Boolean))]
    : [];
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const fuse = new Fuse(teachers, {
    keys: ['name', 'subject'],
    threshold: 0.3,
  });

  const getFilteredTeachers = () => {
    let filtered = teachers;

    if (selectedSubject !== "All") {
      filtered = filtered.filter(teacher => teacher.subject === selectedSubject);
    }

    if (searchQuery) {
      const searchResults = fuse.search(searchQuery);
      filtered = searchResults.map(result => result.item);
    }

    return filtered;
  };

  const handleEdit = async (teacherId) => {
    router.push(`/admin/teacher/edit/${teacherId}`)
  };

  const handleDelete = async (teacherId) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return;

    try {
      const response = await fetch(`/api/teachers/${teacherId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      await fetchTeachers(); // Re-fetch data to refresh the table
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };


  const handleAddNew = () => {
    router.push(`/admin/teacher/add`)
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-6xl mx-auto p-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Teachers Management</CardTitle>
          <Button onClick={handleAddNew} className="bg-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add New Teacher
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search teachers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Subject: {selectedSubject}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedSubject("All")}>
                All
              </DropdownMenuItem>
              {subjects.map((subject) => (
                <DropdownMenuItem
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                >
                  {subject}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="border rounded-lg">
          <Table>
          <TableHeader>
  <TableRow>
    <TableHead>Photo</TableHead>
    <TableHead>Name</TableHead>
    <TableHead>Subject</TableHead>
    <TableHead>Description</TableHead> {/* New Description Column */}
    <TableHead className="text-right">Actions</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
  {getFilteredTeachers().map((teacher) => (
    <TableRow key={teacher.id}>
      <TableCell>
        <img
          src={'/api/file'+teacher.photoUrl || '/placeholder-avatar.png'}
          alt={teacher.firstName}
          className="w-10 h-10 rounded-full object-cover"
        />
      </TableCell>
      <TableCell className="font-medium">{teacher.firstName} {teacher.lastName}</TableCell>
      <TableCell>
        <Badge variant="secondary">
          {teacher.subject}
        </Badge>
      </TableCell>
      <TableCell>
        {/* Display description with a max of 20 characters */}
        {teacher.description && teacher.description.length > 20
          ? `${teacher.description.slice(0, 20)}...`
          : teacher.description}
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleEdit(teacher._id)}
          className="mr-2"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDelete(teacher._id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherAdminPanel;
