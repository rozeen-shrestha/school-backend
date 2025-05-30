'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import Fuse from 'fuse.js';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [visibleBooks, setVisibleBooks] = useState(4);

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch('/api/elibrary/list');
      const data = await response.json();
      setBooks(data);
      setFilteredBooks(data);
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    const fuse = new Fuse(books, {
      keys: ['title', 'author', 'tags'],
    });
    const result = fuse.search(searchTerm);
    setFilteredBooks(searchTerm ? result.map(({ item }) => item) : books);
    setVisibleBooks(4); // Reset visible books when search term changes
  }, [searchTerm, books]);

  const loadMoreBooks = () => {
    setVisibleBooks((prevVisibleBooks) => prevVisibleBooks + 4);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center w-full">
        <h1 className="text-3xl font-bold mb-4">Book Catalog</h1>
        <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
          <div className="relative flex-grow max-w-[400px] w-full">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search books..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {filteredBooks.slice(0, visibleBooks).map((book) => (
          <Card key={book._id} className="flex flex-col h-full">
            <CardContent className="flex-grow p-4 flex flex-col items-center justify-center text-center">
              <div className="relative w-full pt-[100%] mb-4">
                <Image
                  src={book.coverImageUrl}
                  alt={book.title}
                  width={300}
                  height={300}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
              <p className="text-sm text-muted-foreground">{book.author}</p>
            </CardContent>
            <CardFooter className="p-4">
              <Button asChild className="w-full">
                <Link href={`view/${book.pdfUrl.split('/').pop().replace('.pdf', '')}`}>Read</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {visibleBooks < filteredBooks.length && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={loadMoreBooks}>Load More</Button>
        </div>
      )}
    </div>
  );
}
