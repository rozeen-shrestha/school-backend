import { getToken } from "next-auth/jwt";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function DELETE(request) {
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
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return new Response("ID is required", {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const client = await clientPromise;
    const db = client.db(dbName);

    // Convert the ID to an ObjectId
    const objectId = new ObjectId(id);

    // Delete the record from the 'news' collection
    const result = await db.collection('news').deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return new Response("Record not found", {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Record deleted successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error deleting news:", error); // Log the error for debugging

    return new Response(
      JSON.stringify({ error: "Failed to delete news" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
