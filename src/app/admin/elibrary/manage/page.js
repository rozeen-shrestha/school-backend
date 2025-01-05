'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import { format } from 'date-fns'
import { MoreHorizontal, FileText, Pencil, Trash } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"

export default function Books() {
  const [books, setBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState(null)
  const router = useRouter()
  const { toast } = useToast()

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/elibrary/list')
      if (!response.ok) {
        throw new Error('Failed to fetch books')
      }
      const data = await response.json()
      setBooks(data)
    } catch (error) {
      console.error('Error fetching books:', error)
      toast({
        title: "Error",
        description: "Failed to fetch books. Please try again.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const fuseOptions = {
    keys: ['title', 'author', 'genre', 'tags', 'language'],
  }

  const fuse = new Fuse(books, fuseOptions)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    const results = fuse.search(searchTerm)
    setSearchResults(results.map((result) => result.item))
  }, [searchTerm, books])

  const getFileExtension = (url) => {
    return url.split('.').pop()?.toUpperCase() || 'Unknown'
  }

  const handleEdit = (book) => {
    const { _id } = book
    router.push(`/admin/elibrary/edit/${_id}`)
  }

  const handleDelete = async () => {
    if (!bookToDelete) return;

    const { bookId, imageName, pdfName } = bookToDelete;

    try {
      console.log('Deleting book:', bookId, imageName, pdfName);
      const response = await fetch(`/api/elibrary/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: bookId,
          imageNames: [imageName],
          pdfNames: [pdfName],
        }),
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (!response.ok) {
        console.error('Delete failed:', responseData.error);
        throw new Error(responseData.error || 'Failed to delete book');
      }

      await fetchBooks();
      toast({
        title: "Success",
        description: "Book deleted successfully",
      });
      setDeleteDialogOpen(false);
      setBookToDelete(null);
    } catch (error) {
      console.error('Error deleting book:', error);
      toast({
        title: "Error",
        description: "Failed to delete book. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full px-2 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Books List</h1>
      <Input
        type="text"
        placeholder="Search books..."
        onChange={handleSearch}
        className="w-full mb-4 bg-gray-800 text-white"
      />
      {searchTerm && searchResults.length === 0 && <p className="mb-4 text-gray-400">No results found.</p>}
      <Table className="w-full border-collapse border border-gray-700 shadow-lg">
        <TableHeader className="bg-gray-800">
          <TableRow>
            <TableHead className="p-3 text-left w-12 text-sm font-semibold text-gray-300">Thumb</TableHead>
            <TableHead className="p-3 text-left text-sm font-semibold text-gray-300">Title</TableHead>
            <TableHead className="p-3 text-left text-sm font-semibold text-gray-300 hidden sm:table-cell">ID</TableHead>
            <TableHead className="p-3 text-left text-sm font-semibold text-gray-300 hidden md:table-cell">Date</TableHead>
            <TableHead className="p-3 text-left text-sm font-semibold text-gray-300 hidden md:table-cell">Author</TableHead>
            <TableHead className="p-3 text-left text-sm font-semibold text-gray-300 hidden md:table-cell">Genre</TableHead>
            <TableHead className="p-3 text-left text-sm font-semibold text-gray-300 hidden md:table-cell">Type</TableHead>
            <TableHead className="p-3 text-right text-sm font-semibold text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-gray-900">
          {(searchTerm ? searchResults : books).map((book) => (
            <TableRow key={book._id} className="border-b dark:border-gray-700 hover:bg-gray-700">
              <TableCell className="p-3">
                <div className="flex items-center">
                  <img
                    src={book.coverImageUrl ? `${book.coverImageUrl}` : '/path/to/fallback/image.jpg'}
                    alt={book.title}
                    className="object-cover w-12 h-16 sm:w-16 sm:h-20"
                  />
                </div>
              </TableCell>
              <TableCell className="p-3 text-sm text-white">
                <span className="font-medium">{book.title}</span>
              </TableCell>
              <TableCell className="p-3 text-sm text-white hidden sm:table-cell">{book.BookId}</TableCell>
              <TableCell className="p-3 text-sm text-white hidden md:table-cell">{format(new Date(book.addedAt), 'yyyy-MM-dd')}</TableCell>
              <TableCell className="p-3 text-sm text-white hidden sm:table-cell">{book.author}</TableCell>
              <TableCell className="p-3 text-sm text-white hidden sm:table-cell">{book.genre}</TableCell>
              <TableCell className="p-3 text-sm text-white hidden md:table-cell">{getFileExtension(book.pdfUrl)}</TableCell>
              <TableCell className="p-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => window.open(book.pdfUrl, '_blank')}>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>View</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEdit(book)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setBookToDelete({
                          bookId: book._id,
                          imageName: book.coverImageUrl?.split('/').pop() || 'unknown.jpg',
                          pdfName: book.pdfUrl?.split('/').pop() || 'unknown.pdf',
                        });
                        setDeleteDialogOpen(true);
                      }}
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
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
