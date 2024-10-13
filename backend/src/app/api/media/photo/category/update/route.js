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

  if (!token) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    // Fetch all categories from the 'categories' collection
    const categories = await db.collection('categories').find({}).toArray();

    if (categories.length === 0) {
      return new Response("No categories found", {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Iterate over each category and fetch corresponding uploads
    for (const category of categories) {
      const uploads = await db.collection('uploads').find({ category: category.name }).toArray();

      // Update the category with the uploads data
      await db.collection('categories').updateOne(
        { name: category.name },
        { $set: { uploads } },
        { upsert: true }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Categories updated with uploads data" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error updating categories:", error); // Log the error for debugging

    return new Response(
      JSON.stringify({ error: "Failed to update categories" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
