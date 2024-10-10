"use client"
import * as React from "react";
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button, FormControl, InputLabel, Select, MenuItem as MenuItemSelect } from "@mui/material";

const TailwindTable = () => {
  const router = useRouter();
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [currentId, setCurrentId] = React.useState(null); // Track the current news ID for actions
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false); // Control delete dialog visibility
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      setNews(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/news/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: currentId }), // Send the id in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to delete news');
      }

      // Update state to remove the deleted news from the list
      setNews((prevNews) => prevNews.filter((item) => item._id !== currentId));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleteDialogOpen(false); // Close the dialog after deletion
      setCurrentId(null); // Reset the current ID
    }
  };

  const handleEdit = (id) => {
    router.push(`news/edit/${id}`);
  };

  const handleNew = () => {
    router.push(`news/new`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Button variant="outlined" onClick={handleNew}>New News</Button>
      <div className="w-full py-2 ">
        <div className="flex justify-between mb-4">
          <FormControl
            variant="outlined"
            size="small"
            className="w-1/4"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Change outline color
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Change hover outline color
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Change focused outline color
                },
                '& .MuiSelect-select': {
                  color: 'white', // Change selected number text color
                },
              },
              '& .MuiSelect-icon': {
                color: 'white', // Change the icon color if needed
              },
            }}
          >
            <InputLabel id="rows-per-page-label">
              <span className='text-white'>Rows per page</span>
            </InputLabel>
            <Select
              labelId="rows-per-page-label"
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              label="Rows per page"
            >
              {[5, 10, 15, 20].map((size) => (
                <MenuItemSelect key={size} value={size}>
                  {size}
                </MenuItemSelect>
              ))}
            </Select>
          </FormControl>

          <div className="flex">
            <button
              onClick={(e) => handleChangePage(e, page - 1)}
              disabled={page === 0}
              className="px-4 py-2 bg-gray-700 text-white rounded-l-lg disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={(e) => handleChangePage(e, page + 1)}
              disabled={page >= Math.ceil(news.length / rowsPerPage) - 1}
              className="px-4 py-2 bg-gray-700 text-white rounded-r-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
        <div className="overflow-auto shadow-lg border border-gray-700 rounded-lg">
          <table className="min-w-full table-auto text-left text-white bg-gray-800">
            <thead className="sticky top-0 bg-gray-900">
              <tr className='ltr'>
                <th className="py-4 ps-2 pe-20 text-xl">Title</th>
                <th className="py-4 text-sm text-center">Date</th>
                <th className="py-4 text-sm text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {news
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <tr key={row._id} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="px-4 py-3 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[200px]">
                      {row.title}
                    </td>
                    <td className="px-4 py-3 text-center text-xs">
                      {row.lastEdited ? new Date(row.lastEdited).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <IconButton
                            aria-label="more"
                            className="duration-200"
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-10"> {/* Adjusted width to a smaller size */}
                          <DropdownMenuItem onClick={() => handleEdit(row._id)}>Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => {
                            setCurrentId(row._id); // Set the current ID for deletion
                            setDeleteDialogOpen(true); // Open the delete confirmation dialog
                          }}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this news item? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default TailwindTable;
