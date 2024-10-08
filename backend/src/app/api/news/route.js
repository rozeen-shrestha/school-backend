import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    // Fetch all news from the 'news' collection, including the lastEdited field
    const news = await db.collection('news').find({}, { projection: { title: 1, message: 1, lastEdited: 1 } }).toArray();

    return new Response(JSON.stringify(news), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return new Response(JSON.stringify({ error: 'Failed to fetch news' }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
