'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function NoticeTable() {
  const router = useRouter();
  const [news, setnews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchnews = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        setnews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchnews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Add New button */}
      <button
        onClick={() => router.push('/admin/news/new')}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add New
      </button>

      <Table>
        <TableCaption>List of all news.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Message</TableHead>
            <TableHead className="text-right">Actions</TableHead> {/* New column for actions */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {news.length > 0 ? (
            news.map((news) => (
              <TableRow key={news._id}>
                <TableCell className="font-medium">{news.title}</TableCell>
                <TableCell>{news.message}</TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => router.push(`/admin/news/edit/${news._id}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No news found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
