import { getToken } from "next-auth/jwt";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
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
    const body = await request.json();
    const { title, message } = body;

    if (!title || !message) {
      return new Response("Title and message are required", {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const client = await clientPromise;
    const db = client.db(dbName);

    // Get the current date and format it as YYYY-MM-DD
    const currentDate = new Date().toISOString().split('T')[0];

    // Insert the new news into the 'news' collection with the current date
    const result = await db.collection('news').insertOne({
      title,
      message,
      lastEdited: currentDate // Add the current date in YYYY-MM-DD format
    });

    return new Response(
      JSON.stringify({ success: true, data: { _id: result.insertedId, title, message, lastEdited: currentDate } }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error saving news:", error); // Log the error for debugging

    return new Response(
      JSON.stringify({ error: "Failed to save news" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
