"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import "quill/dist/quill.snow.css"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Save, Eye } from "lucide-react"

// Dynamically import the Quill editor
const Quill = dynamic(() => import("react-quill"), { ssr: false })

export default function NewsForm() {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const router = useRouter()

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  }

  const togglePreview = () => {
    setShowPreview(!showPreview)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!title.trim()) {
      setError("Title is required")
      return
    }

    if (!message.trim() || message === "<p><br></p>") {
      setError("Message content is required")
      return
    }

    try {
      const res = await fetch("/api/news/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, message }),
      })

      if (!res.ok) {
        throw new Error("Failed to create News")
      }

      router.push("/admin/news")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
        {/* Editor Section */}
        <Card className={`w-full lg:w-1/2 shadow-lg rounded-2xl ${showPreview ? "hidden lg:block" : "block"}`}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create News Article</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter news title"
                  className="w-full rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Content</Label>
                <div className="border rounded-lg overflow-hidden">
                  <Quill
                    id="message"
                    value={message}
                    onChange={setMessage}
                    modules={quillModules}
                    className="min-h-[200px]"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={togglePreview} className="lg:hidden flex items-center gap-2 rounded-lg">
              <Eye size={16} />
              Preview
            </Button>
            <Button onClick={handleSubmit} className="ml-auto flex items-center gap-2 rounded-lg">
              <Save size={16} />
              Save Article
            </Button>
          </CardFooter>
        </Card>

        {/* Preview Section */}
        <Card className={`w-full lg:w-1/2 shadow-lg rounded-2xl ${!showPreview ? "hidden lg:block" : "block"}`}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Preview</CardTitle>
          </CardHeader>
          <CardContent className="bg-card rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <Button variant="outline" onClick={togglePreview} className="lg:hidden flex items-center gap-2 rounded-lg">
                <Eye size={16} />
                Back to Editor
              </Button>
              <div className="flex items-center text-muted-foreground ml-auto">
                <CalendarIcon size={16} className="mr-2" />
                <span>{currentDate}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-bold">{title || "Your Title Will Appear Here"}</h1>
              <div className="prose prose-sm max-w-none">
                {message ? (
                  <div dangerouslySetInnerHTML={{ __html: message }} />
                ) : (
                  <p className="text-muted-foreground italic">Your content will appear here as you type...</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
