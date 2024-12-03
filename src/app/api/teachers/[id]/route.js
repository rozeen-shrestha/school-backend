import { getToken } from "next-auth/jwt";
import { MongoClient, ObjectId } from "mongodb";
import { unlink } from 'fs/promises';
import { join } from 'path';

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

  if (!id || !ObjectId.isValid(id)) {
    return new Response("Invalid Teacher ID", {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection('teachers');

    // Fetch the current teacher data to get the photo URL
    const teacher = await collection.findOne({ _id: new ObjectId(id) });
    if (!teacher) {
      return new Response("Teacher not found", {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Delete the teacher record from the database
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response("Record not found", {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Delete the photo file if it exists
    if (teacher.photoUrl) {
      const photoPath = join(process.cwd(), 'public', teacher.photoUrl);
      try {
        await unlink(photoPath);
      } catch (error) {
        console.error('Error deleting photo:', error);
      }
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
    console.error('Error deleting record:', error);
    return new Response("Failed to delete record", {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

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
      const teacherItem = await db.collection('teachers').findOne({ _id: new ObjectId(id) });

      if (!teacherItem) {
        return new Response(JSON.stringify({ error: 'Teacher not found' }), {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      return new Response(JSON.stringify(teacherItem), {
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
      console.error("Error fetching teachers:", error); // Log any errors encountered
      return new Response(JSON.stringify({ error: 'Failed to fetch teachers ' }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }
