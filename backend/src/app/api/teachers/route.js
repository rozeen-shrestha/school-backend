import { MongoClient } from 'mongodb';

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

    const teachers = await db.collection('teachers').find({}).toArray();

    return new Response(JSON.stringify(teachers), {
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
    console.error("Error fetching teachers:", error); // Log any errors encountered
    return new Response(JSON.stringify({ error: 'Failed to fetch teachers' }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
