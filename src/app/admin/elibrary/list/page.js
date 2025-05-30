"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Fuse from "fuse.js"
import { format } from "date-fns"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const BookTable = () => {
  const router = useRouter()
  const [books, setBooks] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")
  const [searchTerm, setSearchTerm] = React.useState("")
  const [searchResults, setSearchResults] = React.useState([])
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [page, setPage] = React.useState(0)

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/elibrary/list")
      if (!response.ok) {
        throw new Error("Failed to fetch books")
      }
      const data = await response.json()
      setBooks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchBooks()
  }, [])

  const fuseOptions = {
    keys: ["title", "author"], // Fields to search on
  }

  const fuse = new Fuse(books, fuseOptions)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  React.useEffect(() => {
    if (searchTerm) {
      const results = fuse.search(searchTerm)
      setSearchResults(results.map((result) => result.item))
    } else {
      setSearchResults([])
    }
  }, [searchTerm, books])

  const handleChangePage = (newPage) => {
    setPage(newPage)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const displayedBooks = searchTerm ? searchResults : books

  // Safe calculation of pagination values
  const totalPages = Math.max(1, Math.ceil((displayedBooks?.length || 0) / rowsPerPage))
  const currentPageItems = displayedBooks?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) || []
  const startItem = displayedBooks?.length ? page * rowsPerPage + 1 : 0
  const endItem = displayedBooks?.length ? Math.min((page + 1) * rowsPerPage, displayedBooks.length) : 0

  return (
    <div className="h-full w-full p-8 space-y-8 bg-card">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">E-Library</h2>
        <p className="text-muted-foreground">Browse and search available books.</p>
      </div>

      <Card className="bg-background">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Books List</CardTitle>
          <div className="flex items-center space-x-4">
            <Input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-64"
            />
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => {
                const newRowsPerPage = Number.parseInt(value, 10)
                setRowsPerPage(newRowsPerPage)
                setPage(0)
              }}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Rows per page" />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 15, 20].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size} rows
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {error ? (
              <div className="p-4 text-destructive bg-destructive/10 rounded-md">
                <h3 className="font-semibold mb-2">Error</h3>
                <p>{error}</p>
                <Button
                  className="mt-4"
                  variant="outline"
                  onClick={() => {
                    setError("")
                    setLoading(true)
                    fetchBooks()
                  }}
                >
                  Try Again
                </Button>
              </div>
            ) : displayedBooks.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-3 text-lg hidden md:table-cell">Thumbnail</th>
                    <th className="border-b p-3 text-lg">Title</th>
                    <th className="border-b p-3 text-lg">Author</th>
                    <th className="border-b p-3 text-lg">Date Added</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageItems.map((book) => (
                    <tr key={book._id} className="hover:bg-muted/50 transition-colors">
                      <td className="border-b p-3 text-base hidden md:table-cell">
                        <img
                          src={book.coverImageUrl}
                          alt={book.title}
                          className="h-16 w-16 object-cover rounded"
                        />
                      </td>
                      <td className="border-b p-3 text-base">
                        <div className="truncate max-w-[200px]">{book.title}</div>
                      </td>
                      <td className="border-b p-3 text-base">{book.author}</td>
                      <td className="border-b p-3 text-base">
                        {format(new Date(book.addedAt), "yyyy-MM-dd")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted-foreground text-center py-4">No books available</p>
            )}
          </ScrollArea>

          {displayedBooks.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startItem} to {endItem} of {displayedBooks.length} entries
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleChangePage(page - 1)} disabled={page <= 0}>
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleChangePage(page + 1)}
                  disabled={page >= totalPages - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default BookTable
