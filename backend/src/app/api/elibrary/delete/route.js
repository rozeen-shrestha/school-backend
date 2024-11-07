import { NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { getToken } from "next-auth/jwt";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export const dynamic = 'force-dynamic';

export async function DELETE(request) {
  const token = await getToken({ req: request });

  if (token?.role != 'admin') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { bookId, imageNames, pdfNames } = body;

    if (!bookId || !Array.isArray(imageNames) || !Array.isArray(pdfNames)) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);

    // Delete the book from the database
    const deleteResult = await db.collection('books').deleteOne({ _id: new ObjectId(bookId) });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    // Delete associated files
    const deleteFilePromises = [
      ...imageNames.map(imageName => unlink(join(process.cwd(), 'public', 'elibrary', 'cover', imageName))),
      ...pdfNames.map(pdfName => unlink(join(process.cwd(), 'public', 'elibrary', 'file', pdfName)))
    ];

    await Promise.all(deleteFilePromises);

    return NextResponse.json({ message: 'Book and associated files deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
