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

export async function DELETE(request, { params }) {
  const token = await getToken({ req: request });

  if (token?.role !== 'admin') {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  const { id } = params;

  if (!id) {
    return new Response("ID is required", {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    const objectId = new ObjectId(id);

    const result = await db.collection('teachers').deleteOne({ _id: objectId });

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
    console.error("Error deleting teacher:", error);

    return new Response(
      JSON.stringify({ error: "Failed to delete teacher" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
