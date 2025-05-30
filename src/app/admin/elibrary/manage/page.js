"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Fuse from "fuse.js"
import { format } from "date-fns"
import { MoreHorizontal, FileText, Pencil, Trash } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Books() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState(null)
  const router = useRouter()
  const { toast } = useToast()

  const fetchBooks = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/elibrary/list")
      if (!response.ok) {
        throw new Error("Failed to fetch books")
      }
      const data = await response.json()
      setBooks(data)
    } catch (error) {
      console.error("Error fetching books:", error)
      toast({
        title: "Error",
        description: "Failed to fetch books. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const fuseOptions = {
    keys: ["title", "author", "genre", "tags", "language"],
  }

  const fuse = new Fuse(books, fuseOptions)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    if (searchTerm) {
      const results = fuse.search(searchTerm)
      setSearchResults(results.map((result) => result.item))
    } else {
      setSearchResults([])
    }
  }, [searchTerm, books])

  const getFileExtension = (url) => {
    return url.split(".").pop()?.toUpperCase() || "Unknown"
  }

  const handleEdit = (book) => {
    const { _id } = book
    router.push(`/admin/elibrary/edit/${_id}`)
  }

  const handleDelete = async () => {
    if (!bookToDelete) return

    const { bookId, imageName, pdfName } = bookToDelete

    try {
      const response = await fetch(`/api/elibrary/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: bookId,
          imageNames: [imageName],
          pdfNames: [pdfName],
        }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to delete book")
      }

      await fetchBooks()
      toast({
        title: "Success",
        description: "Book deleted successfully",
      })
      setDeleteDialogOpen(false)
      setBookToDelete(null)
    } catch (error) {
      console.error("Error deleting book:", error)
      toast({
        title: "Error",
        description: "Failed to delete book. Please try again.",
        variant: "destructive",
      })
    }
  }

  const displayedBooks = searchTerm ? searchResults : books

  return (
    <div className="h-full w-full p-8 space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">E-Library Management</h2>
        <p className="text-muted-foreground">View, edit or delete books in your collection.</p>
      </div>

      <Card>
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
          </div>
        </CardHeader>
        <CardContent>
          {searchTerm && displayedBooks.length === 0 && (
            <p className="mb-4 text-muted-foreground">No results found.</p>
          )}

          <ScrollArea className="h-[500px] pr-4">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Thumb</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden sm:table-cell">ID</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="hidden md:table-cell">Author</TableHead>
                    <TableHead className="hidden md:table-cell">Genre</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedBooks.map((book) => (
                    <TableRow key={book._id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <div className="flex items-center">
                          <img
                            src={book.coverImageUrl ? `${book.coverImageUrl}` : "/path/to/fallback/image.jpg"}
                            alt={book.title}
                            className="object-cover w-12 h-16 rounded"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell className="hidden sm:table-cell">{book.BookId}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(new Date(book.addedAt), "yyyy-MM-dd")}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{book.author}</TableCell>
                      <TableCell className="hidden md:table-cell">{book.genre}</TableCell>
                      <TableCell className="hidden md:table-cell">{getFileExtension(book.pdfUrl)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => window.open(book.pdfUrl, "_blank")}
                              className="cursor-pointer"
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              <span>View</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEdit(book)}
                              className="cursor-pointer"
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setBookToDelete({
                                  bookId: book._id,
                                  imageName: book.coverImageUrl?.split("/").pop() || "unknown.jpg",
                                  pdfName: book.pdfUrl?.split("/").pop() || "unknown.pdf",
                                })
                                setDeleteDialogOpen(true)
                              }}
                              className="cursor-pointer text-destructive"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* AlertDialog for deletion confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this book? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
