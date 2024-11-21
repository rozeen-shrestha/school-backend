import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getToken } from "next-auth/jwt";
import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from 'uuid';

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

// Validate image files
const isValidImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
};

// Validate PDF file
const isValidPdfFile = (file) => file.type === 'application/pdf';

export async function POST(request) {
  const token = await getToken({ req: request });

  if (token?.role != 'admin') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const author = formData.get('author');
    const ISBN = formData.get('ISBN');
    const publicationYear = parseInt(formData.get('publicationYear'));
    const genre = formData.get('genre').split(',');
    const tags = formData.get('tags').split(',');
    const language = formData.get('language');
    const description = formData.get('description');
    const coverImage = formData.get('coverImage');
    const pdfFile = formData.get('pdfFile');

    if (!title || !author || !ISBN || !publicationYear || !language) {
      return NextResponse.json({ error: 'Title, author, ISBN, publication year, and language are required' }, { status: 400 });
    }

    if (!coverImage || !isValidImageFile(coverImage)) {
      return NextResponse.json({ error: 'Invalid or missing cover image' }, { status: 400 });
    }

    if (!pdfFile || !isValidPdfFile(pdfFile)) {
      return NextResponse.json({ error: 'Invalid or missing PDF file' }, { status: 400 });
    }

    // Directory paths
    const libraryDir = join(ELIBRARY_STORAGE_PATH, 'library');

    // Create directories if they don't exist
    await mkdir(libraryDir, { recursive: true });
    await mkdir(join(libraryDir, 'covers'), { recursive: true });
    await mkdir(join(libraryDir, 'books'), { recursive: true });

    // Handle cover image upload
    const coverBuffer = Buffer.from(await coverImage.arrayBuffer());
    const coverUniqueId = uuidv4();
    const coverExt = coverImage.name.split('.').pop();
    const coverFilename = `${coverUniqueId}.${coverExt}`;
    const coverPath = join(libraryDir, 'covers', coverFilename);

    await writeFile(coverPath, coverBuffer);
    const coverImageUrl = `/api/libraryfiles/covers/${coverFilename}`;

    // Handle PDF upload
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
    const pdfUniqueId = uuidv4();
    const pdfFilename = `${pdfUniqueId}.pdf`;
    const pdfPath = join(libraryDir, 'books', pdfFilename);

    await writeFile(pdfPath, pdfBuffer);
    const pdfUrl = `/api/libraryfiles/books/${pdfFilename}`;

    const client = await clientPromise;
    const db = client.db(dbName);

    const highestBook = await db.collection('books')
      .find()
      .sort({ BookId: -1 })
      .limit(1)
      .toArray();

    const newBookId = highestBook.length > 0 ? highestBook[0].BookId + 1 : 1;

    // Insert new book into the Books collection
    const result = await db.collection('books').insertOne({
      BookId: newBookId,
      title,
      author,
      ISBN,
      publicationYear,
      genre,
      tags,
      language,
      description,
      coverImageUrl,
      pdfUrl,
      addedBy: token.sub,
      addedAt: new Date(),
      lastUpdated: new Date(),
    });

    return NextResponse.json({
      success: true,
      bookId: result.insertedId,
      title,
      coverImageUrl,
      pdfUrl,
    }, { status: 201 });

  } catch (error) {
    console.error('Error adding book:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
