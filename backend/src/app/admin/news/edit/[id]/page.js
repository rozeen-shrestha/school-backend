'use client'; // Enable client-side code

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'quill/dist/quill.snow.css'; // Import Quill styles
import dynamic from 'next/dynamic';

// Dynamically import the Quill editor
const Quill = dynamic(() => import('react-quill'), { ssr: false });

export default function NewNewsForm({ params }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading
  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true); // Start loading
      try {
        const res = await fetch(`/api/news/${params.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch News');
        }
        const data = await res.json();
        setTitle(data.title);
        setMessage(data.message);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchNews();
  }, [params.id]); // Fetch when the component mounts or when the id changes

  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],             // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],  // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }],      // outdent/indent
      [{ direction: 'rtl' }],                     // text direction
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],        // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ['clean']                                   // remove formatting button
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/news/edit', {
        method: 'PUT', // Use PUT for updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: params.id, title, message }), // ID remains as is
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update News');
      }

      const responseData = await res.json(); // Optional: Capture the success response
      console.log(responseData); // Log success response for debugging
      router.push('/admin/news'); // Redirect to news page
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Render a loading animation when loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-start">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl h-full shadow-lg rounded-md sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4">Edit News</h1>
        {error && <p className="text-red-500 mb-4 text-sm sm:text-base">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md text-xs sm:text-sm md:text-base"
            required // Make this field required
          />
        </div>
        <div className="mb-6"> {/* Margin below the message section */}
          <label className="block text-sm font-medium mb-1">Message</label>
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <Quill
              value={message}
              onChange={setMessage}
              modules={quillModules}
              className="text-xs max-w-screen-xl sm:text-sm md:text-base"
              required // Ensure the message is required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md text-xs sm:text-sm md:text-base"
        >
          Update
        </button>
      </form>
    </div>
  );
}
