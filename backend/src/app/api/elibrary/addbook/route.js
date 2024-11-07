import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getToken } from "next-auth/jwt";
import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from 'uuid';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

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
    const coverDir = join(process.cwd(), 'public', 'elibrary', 'cover');
    const fileDir = join(process.cwd(), 'public', 'elibrary', 'file');

    // Create directories if they don't exist
    await mkdir(coverDir, { recursive: true });
    await mkdir(fileDir, { recursive: true });

    const currentDate = new Date().toISOString().split('T')[0];

    // Handle cover image upload
    const coverBuffer = Buffer.from(await coverImage.arrayBuffer());
    const coverUniqueId = uuidv4();
    const coverExt = coverImage.name.split('.').pop();
    const coverFilename = `${coverUniqueId}.${coverExt}`;
    const coverPath = join(coverDir, coverFilename);

    await writeFile(coverPath, coverBuffer);
    const coverImageUrl = `/elibrary/cover/${coverFilename}`;

    // Handle PDF upload
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
    const pdfUniqueId = uuidv4();
    const pdfFilename = `${pdfUniqueId}.pdf`;
    const pdfPath = join(fileDir, pdfFilename);

    await writeFile(pdfPath, pdfBuffer);
    const pdfUrl = `/elibrary/file/${pdfFilename}`;

    const client = await clientPromise;
    const db = client.db(dbName);

    // Get the highest existing bookId
    const highestBook = await db.collection('books')
      .find()
      .sort({ bookId: -1 })
      .limit(1)
      .toArray();

    const newBookId = highestBook.length > 0 ? highestBook[0].bookId + 1 : 1; // Start at 1 if no books exist

    // Insert new book into the Books collection
    const result = await db.collection('books').insertOne({
      BookId: newBookId, // Assign the new bookId
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
      addedBy: token.sub, // Assuming token.sub is the admin ID
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
