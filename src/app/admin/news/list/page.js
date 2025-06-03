"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Edit, Trash2 } from "lucide-react"
import Image from "next/image"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const SCHOOL_LOGO = "/school-logo.png"

export default function NewsTable() {
  const router = useRouter()
  const [news, setNews] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState("")
  const [currentId, setCurrentId] = React.useState(null)
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const fetchNews = async () => {
    try {
      console.log("Fetching news data...")
      const response = await fetch("/api/news")

      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log("News data received:", data)

      if (!Array.isArray(data)) {
        console.error("Expected array but received:", data)
        throw new Error("Invalid data format received from API")
      }

      setNews(data)
    } catch (err) {
      console.error("Error fetching news:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    // Fetch news data from API
    fetchNews()
  }, [])

  const handleDelete = async () => {
    if (!currentId) {
      console.error("Attempted to delete with null ID")
      return
    }

    try {
      console.log("Deleting news item with ID:", currentId)

      const response = await fetch("/api/news/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: currentId }),
      })

      if (!response.ok) {
        throw new Error(`Failed to delete news: ${response.status} ${response.statusText}`)
      }

      console.log("Successfully deleted news item")
      setNews((prevNews) => prevNews.filter((item) => item._id !== currentId))
    } catch (err) {
      console.error("Error deleting news:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred during deletion")
    } finally {
      setDeleteDialogOpen(false)
      setCurrentId(null)
    }
  }

  const handleEdit = (id) => {
    if (!id) {
      console.error("Attempted to edit with null ID")
      return
    }

    console.log("Navigating to edit page for ID:", id)
    router.push(`/admin/news/edit/${id}`)
  }

  const handleChangePage = (newPage) => {
    console.log("Changing page from", page, "to", newPage)
    setPage(newPage)
  }

  // Safe calculation of pagination values
  const totalPages = Math.max(1, Math.ceil((news?.length || 0) / rowsPerPage))
  const currentPageItems = news?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) || []
  const startItem = news?.length ? page * rowsPerPage + 1 : 0
  const endItem = news?.length ? Math.min((page + 1) * rowsPerPage, news.length) : 0

  return (
    <div className="h-full w-full p-8 space-y-8 bg-card">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Manage News</h2>
        <p className="text-muted-foreground">View, edit, or delete news items.</p>
      </div>

      <Card className="bg-background">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>News List</CardTitle>
          <div className="flex items-center space-x-2">
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
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            ) : error ? (
              <div className="p-4 text-destructive bg-destructive/10 rounded-md">
                <h3 className="font-semibold mb-2">Error</h3>
                <p>{error}</p>
                <Button
                  className="mt-4"
                  variant="outline"
                  onClick={() => {
                    setError("")
                    setLoading(true)
                    fetchNews()
                  }}
                >
                  Try Again
                </Button>
              </div>
            ) : news.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-3 text-lg">Title</th>
                    <th className="border-b p-3 text-lg">Date</th>
                    <th className="border-b p-3 text-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageItems.map((item) => (
                    <tr key={item._id} className="hover:bg-muted/50 transition-colors">
                      <td className="border-b p-3 text-base flex items-center gap-2">
                        <Image
                          src={item.images?.[0] ? `/api/file${item.images[0].startsWith('/') ? item.images[0] : '/' + item.images[0]}` : SCHOOL_LOGO}
                          alt="thumbnail"
                          width={40}
                          height={28}
                          className="rounded object-cover"
                          unoptimized={!!item.images?.[0]}
                        />
                        {item.title}
                      </td>
                      <td className="border-b p-3 text-base">
                        {item.lastEdited ? new Date(item.lastEdited).toLocaleString() : "N/A"}
                      </td>
                      <td className="border-b p-3 text-base text-right">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(item._id)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                            setCurrentId(item._id)
                            setDeleteDialogOpen(true)
                            }}
                            className="ml-2"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted-foreground text-center py-4">No news items available</p>
            )}
          </ScrollArea>

          {news.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {startItem} to {endItem} of {news.length} entries
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

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this news item? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
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
