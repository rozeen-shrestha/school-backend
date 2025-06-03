import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let cachedClient = null;

async function getDbClient() {
  if (!cachedClient) {
    console.log('[API] [libraryfiles] Connecting to MongoDB');
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }
  return cachedClient;
}

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  console.log('[API] [libraryfiles] GET request received');
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    console.warn('[API] [libraryfiles] Unauthorized access attempt');
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { path: filePathArray } = params;
  const filename = filePathArray.join('/');
  const fileId = path.basename(filename, path.extname(filename));

  let baseDir;
  if (filePathArray[0] === 'covers') {
    baseDir = path.join(process.cwd(), 'elibrary', 'library', 'covers');
  } else if (filePathArray[0] === 'books') {
    baseDir = path.join(process.cwd(), 'elibrary', 'library', 'books');
  } else {
    console.warn('[API] [libraryfiles] Invalid path:', filePathArray[0]);
    return new NextResponse('Invalid path', { status: 400 });
  }

  const fullFilePath = path.resolve(baseDir, ...filePathArray.slice(1));
  if (!fullFilePath.startsWith(baseDir)) {
    console.warn('[API] [libraryfiles] Path traversal attempt:', fullFilePath);
    return new NextResponse('Invalid path', { status: 400 });
  }

  if (token.role === 'admin') {
    console.log(`[API] [libraryfiles] Admin access granted for file: ${fullFilePath}`);
    return serveFile(fullFilePath, filePathArray[0]);
  }

  try {
    const client = await getDbClient();
    const db = client.db(dbName);
    const booksCollection = db.collection('books');

    const book = await booksCollection.findOne({
      $or: [
        { pdfUrl: new RegExp(fileId) },
        { coverImageUrl: new RegExp(fileId) }
      ]
    });

    if (!book) {
      console.warn('[API] [libraryfiles] Book not found for fileId:', fileId);
      return new NextResponse('Not Found', { status: 404 });
    }

    const userBooks = token.permissions?.books ?? [];
    const userTags = token.permissions?.tags ?? [];

    const hasBookAccess = userBooks.includes(book.BookId.toString()) || userBooks.includes('all');
    const hasTagAccess = book.tags.some(tag => userTags.includes(tag));

    if (!hasBookAccess && !hasTagAccess) {
      console.warn('[API] [libraryfiles] Permission denied for user:', token.name || token.sub);
      return new NextResponse('Unauthorized', { status: 401 });
    }

    console.log(`[API] [libraryfiles] File access granted for user: ${token.name || token.sub}, file: ${fullFilePath}`);
    return serveFile(fullFilePath, filePathArray[0]);

  } catch (error) {
    console.error('[API] [libraryfiles] Database error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

function serveFile(fullFilePath, fileType) {
  if (!fs.existsSync(fullFilePath)) {
    console.warn('[API] [libraryfiles] File not found:', fullFilePath);
    return new NextResponse('File not found', { status: 404 });
  }

  const ext = path.extname(fullFilePath).toLowerCase();
  const contentTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.pdf': 'application/pdf',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp'
  };

  const contentType = contentTypes[ext] || 'application/octet-stream';
  const cacheControl = fileType === 'covers'
    ? 'public, max-age=31536000, immutable'
    : 'private, no-cache, no-store, must-revalidate';

  const stream = fs.createReadStream(fullFilePath);
  return new NextResponse(stream, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
