import { MongoClient, ObjectId } from 'mongodb';

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

export async function GET(request, { params }) {
  const { id } = params; // Get the ID from the request parameters

  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    // Check if the ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: 'Invalid ID format' }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Fetch the specific news item from the 'news' collection
    const newsItem = await db.collection('news').findOne({ _id: new ObjectId(id) }, { projection: { title: 1, message: 1, lastEdited: 1 } });

    if (!newsItem) {
      return new Response(JSON.stringify({ error: 'News item not found' }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(newsItem), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "Surrogate-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error fetching news item:", error); // Log any errors encountered
    return new Response(JSON.stringify({ error: 'Failed to fetch news item' }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
