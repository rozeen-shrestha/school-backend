'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle } from "lucide-react"

export default function AddBook() {
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
  const [coverImage, setCoverImage] = useState(null)
  const [pdfFile, setPdfFile] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    if (e.target.name === 'coverImage') {
      setCoverImage(e.target.files[0])
    } else if (e.target.name === 'pdfFile') {
      setPdfFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const formDataObj = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value)
    })

    if (coverImage) {
      formDataObj.append('coverImage', coverImage)
    }

    if (pdfFile) {
      formDataObj.append('pdfFile', pdfFile)
    }

    try {
      const response = await fetch('/api/elibrary/addbook', {
        method: 'POST',
        body: formDataObj,
      })

      if (!response.ok) {
        const resData = await response.json()
        throw new Error(resData.error || 'Failed to add book')
      }

      setSuccess(true)
      setFormData({
        title: '',
        author: '',
        ISBN: '',
        publicationYear: '',
        genre: '',
        tags: '',
        language: '',
        description: '',
      })
      setCoverImage(null)
      setPdfFile(null)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add a New Book</CardTitle>
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
            <AlertDescription>Book added successfully!</AlertDescription>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image</Label>
              <Input
                id="coverImage"
                name="coverImage"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pdfFile">PDF File</Label>
              <Input
                id="pdfFile"
                name="pdfFile"
                type="file"
                onChange={handleFileChange}
                accept="application/pdf"
              />
            </div>
          </div>
          <Button type="submit" className="w-full">Add Book</Button>
        </form>
      </CardContent>
    </Card>
  )
}
