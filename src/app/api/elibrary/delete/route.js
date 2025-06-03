import { NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { getToken } from "next-auth/jwt";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

// Define storage path inside project root
const ELIBRARY_STORAGE_PATH = join(process.cwd(), 'elibrary');

let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export const dynamic = 'force-dynamic';

export async function DELETE(request) {
  console.log('[API] [elibrary/delete] DELETE request received');
  const token = await getToken({ req: request });

  if (token?.role != 'admin') {
    console.warn('[API] [elibrary/delete] Unauthorized access attempt');
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { bookId, imageNames, pdfNames } = body;

    if (!bookId || !Array.isArray(imageNames) || !Array.isArray(pdfNames)) {
      console.warn('[API] [elibrary/delete] Invalid request format');
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);

    // Delete the book from the database
    const deleteResult = await db.collection('books').deleteOne({ _id: new ObjectId(bookId) });

    if (deleteResult.deletedCount === 0) {
      console.warn(`[API] [elibrary/delete] Book not found: ${bookId}`);
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    // Define library directory
    const libraryDir = join(ELIBRARY_STORAGE_PATH, 'library');

    // Delete associated files
    const deleteFilePromises = [
      ...imageNames.map(imageName => {
        const path = join(libraryDir, 'covers', imageName);
        console.log(`[API] [elibrary/delete] Deleting image: ${path}`);
        return unlink(path);
      }),
      ...pdfNames.map(pdfName => {
        const path = join(libraryDir, 'books', pdfName);
        console.log(`[API] [elibrary/delete] Deleting PDF: ${path}`);
        return unlink(path);
      })
    ];

    await Promise.all(deleteFilePromises);

    console.log(`[API] [elibrary/delete] Book and files deleted for bookId: ${bookId}`);
    return NextResponse.json({ message: 'Book and associated files deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('[API] [elibrary/delete] Error deleting book:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
