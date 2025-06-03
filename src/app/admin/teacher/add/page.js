'use client'
import React, { useState } from 'react';
import { X, Upload, Facebook, Instagram } from 'lucide-react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

const AddTeacherForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCustomSubject, setIsCustomSubject] = useState(false); // State for custom subject input
  const router = useRouter();
const onClose = () => {
    router.push(`/admin/teacher/manage`)
}

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History",
    "Geography",
    "Custom"
  ];

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      customSubject: '', // Field for custom subject
      description: '',
      facebook: '',
      instagram: ''
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview({ src: reader.result, file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('description', data.description.replace(/\n/g, '\r\n')); // Preserving line breaks
      formData.append('subject', isCustomSubject ? data.customSubject : data.subject);
      formData.append('facebook', data.facebook);
      formData.append('instagram', data.instagram);
      if (imagePreview) {
        formData.append('photo', imagePreview.file);
      }

      const response = await fetch('/api/teachers/add', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to add teacher');
      }

      await response.json();
      router.push('/admin/teacher/manage');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Add New Teacher</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
   {/* Photo Upload */}
   <div className="space-y-2">
              <Label>Photo</Label>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview.src}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                  </div>
                )}
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Upload a photo</p>
                  <p>JPG, PNG or GIF, max 2MB</p>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (Optional)</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@school.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1 (555) 000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Social Media */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-2">
                        <Facebook className="w-4 h-4" />
                        Facebook Profile (Optional)
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://facebook.com/profile" {...field} />
                    </FormControl>
                    <FormDescription>
                      Full Facebook profile URL
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-2">
                        <Instagram className="w-4 h-4" />
                        Instagram Profile (Optional)
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://instagram.com/username" {...field} />
                    </FormControl>
                    <FormDescription>
                      Full Instagram profile URL
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="About Teacher"
                      {...field}
                      style={{ whiteSpace: "pre-line" }} // Preserves line breaks when displayed
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subject Selection with Custom Option */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setIsCustomSubject(value === 'Custom');
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Custom Subject Field */}
            {isCustomSubject && (
              <FormField
                control={form.control}
                name="customSubject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter custom subject" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>

          <CardFooter className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Add Teacher'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AddTeacherForm;
