"use client"

import * as React from "react";
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { FormControl, InputLabel, Select, MenuItem as MenuItemSelect } from "@mui/material";
import { format } from "date-fns";

const BookTable = () => {
  const router = useRouter();
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/elibrary/list');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchBooks();
  }, []);

  const fuseOptions = {
    keys: ['title', 'author'], // Fields to search on
  };

  const fuse = new Fuse(books, fuseOptions);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  React.useEffect(() => {
    const results = fuse.search(searchTerm);
    setSearchResults(results.map((result) => result.item));
  }, [searchTerm, books]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  const displayedBooks = searchTerm ? searchResults : books;

  return (
    <div className="w-full space-y-6">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="border border-muted p-2 rounded bg-background text-foreground w-full mb-4"
      />
      <div className="flex justify-between mb-4">
        <FormControl
          variant="outlined"
          size="small"
          className="w-1/4 text-foreground"
        >
          <InputLabel id="rows-per-page-label" className="text-muted-foreground">
            Rows per page
          </InputLabel>
          <Select
            labelId="rows-per-page-label"
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            label="Rows per page"
            className="bg-card text-foreground"
            MenuProps={{
              PaperProps: {
                className: 'bg-background text-foreground',
              },
            }}
          >
            {[5, 10, 15, 20].map((size) => (
              <MenuItemSelect key={size} value={size} className="hover:bg-muted text-foreground">
                {size}
              </MenuItemSelect>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="overflow-auto shadow-lg border border-muted rounded-lg">
        <table className="min-w-full table-auto text-left">
          <thead className="sticky top-0 bg-card">
            <tr>
              <th className="hidden md:table-cell py-4 ps-2 pe-4 text-sm text-muted-foreground">Thumbnail</th>
              <th className="py-4 ps-2 pe-4 text-sm text-muted-foreground">Title</th>
              <th className="py-4 text-sm text-center text-muted-foreground">Author</th>
              <th className="py-4 text-sm text-center text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {displayedBooks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((book) => (
                <tr key={book._id} className="border-b border-muted hover:bg-muted/10">
                  <td className="hidden md:table-cell px-4 py-3">
                    <img src={`${book.coverImageUrl}`} alt={book.title} className="h-16 w-16 object-cover rounded" />
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[200px]">
                    {book.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-muted-foreground">
                    {book.author}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-muted-foreground">
                    {format(new Date(book.addedAt), 'yyyy-MM-dd')}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookTable;
