import { MongoClient, ObjectId } from 'mongodb'; // Import ObjectId for MongoDB
import { getToken } from 'next-auth/jwt'; // Import token verification

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let client;
let clientPromise;

// Create MongoClient only once and connect
if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export const dynamic = 'force-dynamic'; // Ensure this route is treated as dynamic

export async function PUT(req) { // Change POST to PUT
  const { id, title, message } = await req.json(); // Get data from request body

  const token = await getToken({ req });
  if (token?.role != 'admin'){
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  try {
    const client = await clientPromise; // Await the MongoDB connection
    const db = client.db(dbName); // Get the database

    // Update the news item in the database
    const result = await db.collection('news').updateOne(
      { _id: new ObjectId(id) }, // Use ObjectId for MongoDB
      {
        $set: {
          title,
          message,
          lastEdited: new Date() // Optional: track last edited timestamp
        }
      }
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ error: 'Failed to update notice' }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error updating notice:", error);
    return new Response(JSON.stringify({ error: 'Failed to update notice' }), { status: 500 });
  }
}
