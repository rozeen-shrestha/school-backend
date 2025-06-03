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
  console.log('[API] [news] GET request received');
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    // Fetch all news from the 'news' collection, sorted by lastEdited descending
    const news = await db.collection('news')
      .find({}, { projection: { title: 1, message: 1, lastEdited: 1, images: 1 } })
      .sort({ lastEdited: -1 })
      .toArray();

    console.log('[API] [news] News fetched successfully');
    return new Response(JSON.stringify(news), {
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
    console.error("Error fetching news:", error); // Log any errors encountered
    return new Response(JSON.stringify({ error: 'Failed to fetch news' }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
