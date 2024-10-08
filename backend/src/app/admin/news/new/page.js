'use client'; // Enable client-side code

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css'; // Import Quill styles

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function NewNoticeForm() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/news/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, message }),
      });

      if (!res.ok) {
        throw new Error('Failed to create notice');
      }

      router.push('/news'); // Redirect to news page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-start justify-start h-screen w-screen p-6">
      <form onSubmit={handleSubmit} className="w-screen h-full shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">New Notice</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-screen border border-gray-300 p-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Message</label>
          <ReactQuill
            value={message}
            onChange={setMessage}
            className="w-screen p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
