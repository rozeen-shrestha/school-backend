"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const userEditSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().optional(),
  role: z.enum(["user", "admin"]),
  fullName: z.string().optional(),
  permissions: z.object({
    books: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }).optional()
});

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id;

  const [isAllPermissions, setIsAllPermissions] = useState(false);
  const [books, setBooks] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const booksFuse = useMemo(() =>
    new Fuse(books, { keys: ['title', 'author'], threshold: 0.3 }),
    [books]
  );
  const tagsFuse = useMemo(() =>
    new Fuse(tags, { keys: ['name'], threshold: 0.3 }),
    [tags]
  );

  const form = useForm({
    resolver: zodResolver(userEditSchema),
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

  // Fetch books, tags, and user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksResponse, tagsResponse, userResponse] = await Promise.all([
          fetch('/api/elibrary/list?type=books'),
          fetch('/api/elibrary/list?type=tags'),
          fetch(`/api/users?userId=${userId}`)
        ]);
        const booksData = await booksResponse.json();
        const tagsData = await tagsResponse.json();
        const userData = await userResponse.json();

        setBooks(booksData.map(book => ({
          id: book._id,
          title: book.title,
          author: book.author
        })));
        setTags(tagsData.tags.map(tag => ({ name: tag })));

        if (userData && userData.data && userData.data.users) {
          const user = Array.isArray(userData.data.users)
            ? userData.data.users.find(u => u._id === userId)
            : userData.data.users;

          if (user) {
            form.reset({
              username: user.username,
              email: user.email,
              password: "",
              role: user.role,
              fullName: user.fullName || "",
              permissions: user.permissions || { books: [], tags: [] }
            });

            // Handle permissions
            if (
              user.permissions &&
              user.permissions.books &&
              user.permissions.books.length === 1 &&
              user.permissions.books[0] === "all"
            ) {
              setIsAllPermissions(true);
              setSelectedBooks([]);
              setSelectedTags([]);
            } else {
              setIsAllPermissions(false);
              setSelectedBooks(
                booksData
                  .filter(book => user.permissions?.books?.includes(book._id))
                  .map(book => ({
                    id: book._id,
                    title: book.title,
                    author: book.author
                  }))
              );
              setSelectedTags(
                tagsData.tags
                  .filter(tag => user.permissions?.tags?.includes(tag))
                  .map(tag => ({ name: tag }))
              );
            }
          }
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load user, books, or tags",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [userId]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        userId,
        ...data,
        permissions: isAllPermissions
          ? { books: ['all'], tags: ['all'] }
          : {
              books: selectedBooks.map(book => book.id),
              tags: selectedTags.map(tag => tag.name)
            }
      };
      // Remove password if empty
      if (!payload.password) delete payload.password;

      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "User Updated",
          description: `User ${data.username} has been updated.`,
        });
        router.push("/admin/users/manage");
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update user",
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Edit User</CardTitle>
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
                    <FormLabel>New Password (leave blank to keep current)</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter new password" {...field} />
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
              Update User
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
