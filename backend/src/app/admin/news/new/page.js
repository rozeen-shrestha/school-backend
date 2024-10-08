'use client'; // Enable client-side code

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import 'quill/dist/quill.snow.css'; // Import Quill styles
import Quill from 'quill';

export default function NewNoticeForm() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const quillRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
      ];

      quillInstance.current = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions
        }
      });

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
        body: JSON.stringify({ title, message }),
      });

      if (!res.ok) {
        throw new Error('Failed to create notice');
      }

      router.push('/admin/news'); // Redirect to news page
    } catch (err) {
      setError(err.message);
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
          <div ref={quillRef} className="w-full p-2 text-xs sm:text-sm md:text-base" />
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
}
