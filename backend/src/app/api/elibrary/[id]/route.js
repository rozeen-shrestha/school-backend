import { getToken } from "next-auth/jwt";
import { MongoClient, ObjectId } from "mongodb";

export const dynamic = 'force-dynamic';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function GET(request, { params }) {
  const token = await getToken({ req: request });

  if (!token) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  try {
    const { id } = params;

    if (!id) {
      return new Response("Book ID is required", {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const client = await clientPromise;
    const db = client.db(dbName);

    // Find the book by its ID in the 'books' collection
    const book = await db.collection('books').findOne({ _id: new ObjectId(id) });

    if (!book) {
      return new Response(
  JSON.stringify(book), // Directly return the book object
  {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  }
);
    }

    // Convert ObjectId to string
    book._id = book._id.toString();

    // Convert Date objects to ISO strings
    if (book.addedAt) book.addedAt = book.addedAt.toISOString();
    if (book.lastUpdated) book.lastUpdated = book.lastUpdated.toISOString();

    return new Response(
        JSON.stringify(book), // Directly return the book object
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  } catch (error) {
    console.error("Error fetching book:", error);

    return new Response(
      JSON.stringify({ error: "Failed to fetch book" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
