import { MongoClient } from 'mongodb';
import { getToken } from "next-auth/jwt";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let client;
let clientPromise;

// Ensure a single instance of MongoClient is created
if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export const dynamic = 'force-dynamic'; // Ensure this route is treated as dynamic

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    // Fetch all categories from the 'categories' collection
    const categories = await db.collection('categories').find({}).toArray();

    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "Surrogate-Control": "no-store"
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error); // Log any errors encountered
    return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function POST(request) {
  const token = await getToken({ req: request });

  if (token?.role != 'admin') {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  try {
    const { category } = await request.json();

    if (!category) {
      return new Response(JSON.stringify({ error: 'Category is required' }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const client = await clientPromise;
    const db = client.db(dbName);

    const existingCategory = await db.collection('categories').findOne({ name: category });
    if (existingCategory) {
      return new Response(JSON.stringify({ error: 'Category already exists' }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const result = await db.collection('categories').insertOne({ name: category });

    return new Response(JSON.stringify({ message: 'Category created', categoryId: result.insertedId }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating category:", error); // Log any errors encountered
    return new Response(JSON.stringify({ error: 'Failed to create category' }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
