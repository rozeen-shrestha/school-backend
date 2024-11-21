'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import axios from 'axios';
import Fuse from 'fuse.js';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get('/api/elibrary/list');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    const fuse = new Fuse(books, {
      keys: ['title', 'author'],
      includeScore: true,
    });

    if (query) {
      const results = fuse.search(query).map(result => result.item);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [query, books]);

  const handleBookClick = (book) => {
    router.push(book.pdfUrl);
  };

  return (
    <div className="space-y-8 mx-auto my-auto max-w-7xl">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to E-Library</h1>
        <p className="text-xl text-muted-foreground">Discover, read, and explore our vast collection of books.</p>
      </section>

      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for books..."
            className="pl-8"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div className="absolute z-10 w-full border  rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto scrollbar-hide">
              {searchResults.slice(0, 3).map(book => (
                <div
                  key={book._id}
                  className="flex items-center p-2 hover:bg-green-400 cursor-pointer rounded-md"
                  onClick={() => handleBookClick(book)}
                >
                  <img src={book.coverImageUrl} alt={book.title} className="w-12 h-16 object-cover mr-4" />
                  <div>
                    <div className="font-bold text-red-600">{book.title}</div>
                    <div className="text-sm text-gray-600">{book.author}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
