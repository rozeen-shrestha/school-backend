'use client'; // Ensure client-side rendering

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'quill/dist/quill.snow.css'; // Import Quill styles
import dynamic from 'next/dynamic'; // Dynamically import components

const QuillNoSSRWrapper = dynamic(() => import('quill'), { ssr: false });

const NewNoticePage = () => {
  const quillRef = useRef(null); // Ref for the Quill editor element
  const quillInstance = useRef(null); // Ref for the Quill instance
  const [title, setTitle] = useState(''); // State for the notice title
  const [message, setMessage] = useState(''); // State for the notice message
  const [error, setError] = useState(null); // State for error handling
  const router = useRouter(); // Next.js router for navigation

  useEffect(() => {
    // Ensure Quill is initialized only on the client side
    if (typeof window !== 'undefined' && quillRef.current && !quillInstance.current) {
      const Quill = require('quill'); // Import Quill dynamically to avoid SSR issues

      const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // Formatting buttons
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }], // Custom header sizes
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript/superscript
        [{ 'indent': '-1' }, { 'indent': '+1' }], // Indentation
        [{ 'direction': 'rtl' }], // Text direction
        [{ 'size': ['small', false, 'large', 'huge'] }], // Text size options
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Header dropdown
        [{ 'color': [] }, { 'background': [] }], // Color options
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'], // Clear formatting button
      ];

      quillInstance.current = new Quill(quillRef.current, {
        theme: 'snow', // Set the theme for Quill
        modules: {
          toolbar: toolbarOptions, // Custom toolbar options
        },
      });

      // Listen for text changes and update the message state
      quillInstance.current.on('text-change', () => {
        setMessage(quillInstance.current.root.innerHTML);
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/news/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, message }), // Send title and message
      });

      if (!res.ok) {
        throw new Error('Failed to create notice');
      }

      router.push('/admin/news'); // Redirect to the news page on success
    } catch (err) {
      setError(err.message); // Set error message if submission fails
    }
  };

  return (
    <div className="flex items-start justify-start p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl h-full shadow-lg rounded-md p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4">New Notice</h1>
        {error && <p className="text-red-500 mb-4 text-sm sm:text-base">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md text-xs sm:text-sm md:text-base"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Message</label>
          <div ref={quillRef} className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md text-xs sm:text-sm md:text-base"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewNoticePage;
