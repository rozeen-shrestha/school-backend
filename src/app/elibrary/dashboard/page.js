"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, TrendingUp, Users, Star, ArrowRight, Sparkles } from "lucide-react"
import axios from "axios"
import Fuse from "fuse.js"

export default function Home() {
  const [books, setBooks] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [featuredBooks, setFeaturedBooks] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get("/api/elibrary/list")
        setBooks(response.data)
        // Set first 6 books as featured
        setFeaturedBooks(response.data.slice(0, 6))
      } catch (error) {
        console.error("Error fetching books:", error)
      }
    }
    fetchBooks()
  }, [])

  useEffect(() => {
    const fuse = new Fuse(books, {
      keys: ["title", "author"],
      includeScore: true,
      threshold: 0.3,
    })

    if (query) {
      setIsSearching(true)
      const results = fuse.search(query).map((result) => result.item)
      setSearchResults(results)
      setIsSearching(false)
    } else {
      setSearchResults([])
    }
  }, [query, books])

  const handleBookClick = (book) => {
    router.push(`view/${book.pdfUrl.split('/').pop().replace('.pdf', '')}`)
  }

  const handleViewAllBooks = () => {
    router.push("/elibrary/book")
  }


  return (
    <div className="min-h-screen space-y-8 mx-auto my-auto max-w-7xl">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center space-y-6 mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Welcome to E-Library
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover, read, and explore our vast collection of books. Your next great adventure in learning starts here.
          </p>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for books, authors, or topics..."
                className="pl-12 h-14 text-lg border-2 border-blue-200 focus:border-blue-500 rounded-xl shadow-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <Card className="absolute z-50 w-full mt-2 shadow-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="max-h-80 overflow-y-auto">
                      {searchResults.slice(0, 5).map((book, index) => (
                        <div
                          key={book._id}
                          className={`flex items-center p-4 hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer transition-colors ${
                            index !== searchResults.length - 1 ? "border-b border-slate-100 dark:border-slate-700" : ""
                          }`}
                          onClick={() => handleBookClick(book)}
                        >
                          <div className="relative w-12 h-16 flex-shrink-0 mr-4">
                            <Image
                              src={book.coverImageUrl || "/placeholder.svg"}
                              alt={book.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-blue-600 dark:text-blue-400 line-clamp-1">
                              {book.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">{book.author}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                      {searchResults.length > 5 && (
                        <div className="p-4 text-center border-t border-slate-100 dark:border-slate-700">
                          <Button variant="ghost" size="sm" onClick={handleViewAllBooks}>
                            View all {searchResults.length} results
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Featured Books Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Featured Books</h2>
              <p className="text-muted-foreground">Discover our most popular and recommended reads</p>
            </div>
            <Button onClick={handleViewAllBooks} variant="outline">
              View All Books
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredBooks.map((book) => (
              <Card
                key={book._id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
                onClick={() => handleBookClick(book)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="aspect-[3/4] relative">
                      <Image
                        src={book.coverImageUrl || "/placeholder.svg"}
                        alt={book.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <Badge className="bg-white/90 text-slate-900 hover:bg-white">
                        <BookOpen className="mr-1 h-3 w-3" />
                        Read
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{book.author}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Reading?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of readers exploring our digital library</p>
          <Button size="lg" variant="secondary" onClick={handleViewAllBooks}>
            Browse All Books
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>
      </div>
    </div>
  )
}
