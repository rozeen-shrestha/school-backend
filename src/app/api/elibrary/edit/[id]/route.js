// /api/elibrary/edit/[id]/route.js
import { getToken } from 'next-auth/jwt';
import { MongoClient, ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Ensure default body parser is enabled
export async function PUT(request, { params }) {
  console.log('[API] [elibrary/edit] PUT request received');
  const token = await getToken({ req: request });

  if (token?.role != 'admin') {
    console.warn('[API] [elibrary/edit] Unauthorized access attempt');
    return new Response('Unauthorized', { status: 401 });
  }

  const { id } = params;

  if (!id || !ObjectId.isValid(id)) {
    console.warn('[API] [elibrary/edit] Invalid Book ID');
    return new Response('Invalid Book ID', { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    // Read the JSON body directly from the request
    const body = await request.json();

    const updateData = {
      title: body.title || null,
      author: body.author || null,
      ISBN: body.ISBN || null,
      publicationYear: body.publicationYear || null,
      genre: Array.isArray(body.genre) ? body.genre : [], // Assume genre is an array
      tags: Array.isArray(body.tags) ? body.tags : [],
      language: body.language || null,
      description: body.description || null,
    };

    // Update the book in the database
    const result = await db.collection('books').updateOne(
      { _id: new ObjectId(id) }, // Ensure you are matching the correct document
      { $set: updateData } // Use $set to update the fields
    );

    if (result.matchedCount === 0) {
      console.warn(`[API] [elibrary/edit] Book not found: ${id}`);
      return new Response('Book not found', { status: 404 });
    }

    console.log(`[API] [elibrary/edit] Book updated: ${id}`);
    return new Response(JSON.stringify({ success: true, message: 'Book updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[API] [elibrary/edit] Error updating book:', error);
    return new Response('Failed to update book', { status: 500 });
  }
}
