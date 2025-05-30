import { MongoClient, ObjectId } from "mongodb";
import { getToken } from 'next-auth/jwt';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

export const dynamic = 'force-dynamic';

let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function GET(request) {
  try {
    const token = await getToken({ req: request });
    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const client = await clientPromise;
    const db = client.db(dbName);

    const url = new URL(request.url);
    const type = url.searchParams.get('type');

    let books = [];
    let tagBooks = [];

    // Fetching books
    if (type === 'books' || !type) {
      if (token.permissions.books.includes('all')) {
        books = await db.collection('books').find().toArray();
      } else {
        const bookIds = token.permissions.books.map(id => new ObjectId(id));
        books = await db.collection('books').find({ _id: { $in: bookIds } }).toArray();
      }
    }

    // Fetching tags
    if (type === 'tags' || !type) {
      if (token.permissions.tags.includes('all')) {
        // If the token has 'all' in tags, return all tags
        tagBooks = await db.collection('books').find().project({ tags: 1 }).toArray();
      } else {
        // Otherwise, return books that match the user's tags
        tagBooks = await db.collection('books').find({ tags: { $in: token.permissions.tags } }).project({ tags: 1 }).toArray();
      }
    }

    // If type is 'tags', return the tags data
    if (type === 'tags') {
      // Flatten tags and return unique tags across all books
      const allTags = tagBooks.reduce((acc, book) => {
        book.tags.forEach(tag => {
          if (!acc.includes(tag)) acc.push(tag);
        });
        return acc;
      }, []);
      return new Response(JSON.stringify({ tags: allTags }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Merge books if needed
    if (!type) {
      const tagBookIds = new Set(tagBooks.map(book => book._id.toString()));
      books = books.concat(tagBooks.filter(book => !tagBookIds.has(book._id.toString())));
    } else if (type === 'tags') {
      books = tagBooks;
    }

    return new Response(JSON.stringify(books), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
