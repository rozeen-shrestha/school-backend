'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle } from "lucide-react"

export default function EditBook({ params }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    ISBN: '',
    publicationYear: '',
    genre: '',
    tags: '',
    language: '',
    description: '',
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/elibrary/${params.id}`)
        if (!res.ok) {
          throw new Error('Failed to fetch book')
        }
        const data = await res.json()
        // Ensure we're setting all the fields from the API response
        setFormData({
          title: data.title || '',
          author: data.author || '',
          ISBN: data.ISBN || '',
          publicationYear: data.publicationYear || '',
          genre: Array.isArray(data.genre) ? data.genre.join(', ') : data.genre || '',
          tags: Array.isArray(data.tags) ? data.tags.join(', ') : data.tags || '',
          language: data.language || '',
          description: data.description || '',
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [params.id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const updatedBookData = {
        ...formData,
        genre: formData.genre ? formData.genre.split(',').map(g => g.trim()) : [], // Ensure genre is an array
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],   // Ensure tags is an array
    };

    try {
        const response = await fetch(`/api/elibrary/edit/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Set content type to application/json
            },
            body: JSON.stringify(updatedBookData), // Send data as JSON
        });

        if (!response.ok) {
            const resData = await response.json();
            throw new Error(resData.error || 'Failed to update book');
        }

        setSuccess(true);
        router.push('/admin/elibrary/manage'); // Redirect to books list page
    } catch (error) {
        setError(error.message);
    }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Edit Book</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-4">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Book updated successfully!</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ISBN">ISBN</Label>
              <Input
                id="ISBN"
                name="ISBN"
                value={formData.ISBN}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publicationYear">Publication Year</Label>
              <Input
                id="publicationYear"
                name="publicationYear"
                type="number"
                value={formData.publicationYear}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
            />
          </div>
          <div className="w-full">
            <p>
              You cannot change the cover page and PDF. If you want to change them, delete and add a new book.
            </p>
          </div>
          <Button type="submit" className="w-full">Update Book</Button>
        </form>
      </CardContent>
    </Card>
  )
}
