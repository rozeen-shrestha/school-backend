"use client";

import { useState, useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import Fuse from 'fuse.js';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const userCreateSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["user", "admin"]),
  fullName: z.string().optional(),
  permissions: z.object({
    books: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }).optional()
});

export default function CreateUserPage() {
  const [isAllPermissions, setIsAllPermissions] = useState(false);
  const [books, setBooks] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  // Fuse search for books and tags
  const booksFuse = useMemo(() =>
    new Fuse(books, {
      keys: ['title', 'author'],
      threshold: 0.3
    }),
    [books]
  );

  const tagsFuse = useMemo(() =>
    new Fuse(tags, {
      keys: ['name'],
      threshold: 0.3
    }),
    [tags]
  );

  // Fetch books and tags on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksResponse, tagsResponse] = await Promise.all([
          fetch('/api/elibrary/list?type=books'),
          fetch('/api/elibrary/list?type=tags')
        ]);

        const booksData = await booksResponse.json();
        const tagsData = await tagsResponse.json();

        setBooks(booksData.map(book => ({
          id: book._id,
          title: book.title,
          author: book.author
        })));

        // Update this part to handle the new tags API response
        setTags(tagsData.tags.map(tag => ({
          name: tag
        })));
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load books and tags",
          variant: "destructive"
        });
      }
    };

    fetchData();
  }, []);

  const form = useForm({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "user",
      fullName: "",
      permissions: {
        books: [],
        tags: []
      }
    }
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        permissions: isAllPermissions
          ? { books: ['all'], tags: ['all'] }
          : {
              books: selectedBooks.map(book => book.id),
              tags: selectedTags.map(tag => tag.name)
            }
      };

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "User Created",
          description: `User ${data.username} has been successfully created.`,
        });
        form.reset();
        setSelectedBooks([]);
        setSelectedTags([]);
        setIsAllPermissions(false);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create user",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  // Book Selection Combobox
  const BookCombobox = () => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const filteredBooks = searchValue
      ? booksFuse.search(searchValue).map(result => result.item)
      : books;

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedBooks.length > 0
              ? `${selectedBooks.length} book(s) selected`
              : "Select books"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput
              placeholder="Search books..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>No books found.</CommandEmpty>
              <CommandGroup>
                {filteredBooks.map((book) => (
                  <CommandItem
                    key={book.id}
                    onSelect={() => {
                      const isSelected = selectedBooks.some(b => b.id === book.id);
                      setSelectedBooks(prev =>
                        isSelected
                          ? prev.filter(b => b.id !== book.id)
                          : [...prev, book]
                      );
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedBooks.some(b => b.id === book.id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {book.title} by {book.author}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };

  // Tags Selection Combobox
  const TagCombobox = () => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const filteredTags = searchValue
      ? tagsFuse.search(searchValue).map(result => result.item)
      : tags;

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedTags.length > 0
              ? `${selectedTags.length} tag(s) selected`
              : "Select tags"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput
              placeholder="Search tags..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>No tags found.</CommandEmpty>
              <CommandGroup>
                {filteredTags.map((tag) => (
                  <CommandItem
                    key={tag.name}
                    onSelect={() => {
                      const isSelected = selectedTags.some(t => t.name === tag.name);
                      setSelectedTags(prev =>
                        isSelected
                          ? prev.filter(t => t.name !== tag.name)
                          : [...prev, tag]
                      );
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedTags.some(t => t.name === tag.name)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {tag.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Create New User</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center space-x-2">
              <Switch
                id="all-permissions"
                checked={isAllPermissions}
                onCheckedChange={setIsAllPermissions}
              />
              <FormLabel htmlFor="all-permissions">
                Grant All Permissions
              </FormLabel>
            </div>

            {!isAllPermissions && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <FormLabel>Book Permissions</FormLabel>
                  <BookCombobox />
                </div>

                <div className="space-y-2">
                  <FormLabel>Tag Permissions</FormLabel>
                  <TagCombobox />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full">
              Create User
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
