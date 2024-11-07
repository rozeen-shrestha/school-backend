import { NextResponse } from 'next/server';
import { unlink, rmdir } from 'fs/promises'; // Import necessary functions from fs/promises
import fs from 'fs'; // Import fs for existsSync
import { join } from 'path';
import { getToken } from "next-auth/jwt";
import { MongoClient, ObjectId } from "mongodb"; // Import ObjectId

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Indicate that the response is dynamic
export const dynamic = 'force-dynamic';

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
    const client = await clientPromise;
    const db = client.db(dbName);

    // Fetch all categories from the 'categories' collection
    const categories = await db.collection('categories').find({}).toArray();

    if (categories.length === 0) {
      return new Response(
        JSON.stringify({ message: "Database is empty" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

export async function DELETE(request) {
  const token = await getToken({ req: request });

  // Check if user is authenticated
  if (token?.role != 'admin') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Parse request body
    const body = await request.json();
    console.log('Request body:', body);

    const client = await clientPromise;
    const db = client.db(dbName);

    // Check if the request is to delete a category
    if (body.categoryId) {
      const categoryId = body.categoryId;

      // Fetch all uploads associated with the category
      const uploads = await db.collection('uploads').find({ category: categoryId }).toArray();

      // Delete each file from the storage
      const deleteResults = await Promise.all(uploads.map(async (upload) => {
        try {
          const filePath = join(process.cwd(), 'public', upload.path);
          if (fs.existsSync(filePath)) {
            await unlink(filePath);
          }

          // Remove the record from the database
          await db.collection('uploads').deleteOne({ _id: upload._id });

          return { success: `Deleted ${upload.filename}` };
        } catch (err) {
          console.error('Error deleting image:', upload.filename, err);
          return { error: `Failed to delete ${upload.filename}` };
        }
      }));

      // Delete the category folder if it exists
      const categoryFolderPath = join(process.cwd(), 'public', 'uploads', categoryId);
      if (fs.existsSync(categoryFolderPath)) {
        await rmdir(categoryFolderPath, { recursive: true });
      }

      // Delete the category itself
      await db.collection('categories').deleteOne({ _id: new ObjectId(categoryId) });

      const successfulDeletes = deleteResults.filter(result => result.success);
      const failedDeletes = deleteResults.filter(result => result.error);

      return NextResponse.json({
        message: 'Category and its uploads deleted',
        successfulDeletes,
        failedDeletes
      }, { status: failedDeletes.length > 0 ? 207 : 200 });

    } else {
      // Check if the request contains a single image or multiple images
      let imageNames = [];
      if (typeof body.imageName === 'string') {
        imageNames = [body.imageName]; // Single image case
      } else if (Array.isArray(body.imageNames)) {
        imageNames = body.imageNames; // Multiple images case
      } else {
        return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
      }

      // Delete each image from the filesystem and database
      const deleteResults = await Promise.all(imageNames.map(async (imageName) => {
        try {
          // Find the image in the database
          const image = await db.collection('uploads').findOne({ filename: imageName });

          if (!image) {
            return { error: `Image not found in the database: ${imageName}` };
          }

          // Delete the file from the filesystem
          const filePath = join(process.cwd(), 'public', image.path);
          await unlink(filePath);

          // Remove the record from the database
          await db.collection('uploads').deleteOne({ filename: imageName });

          return { success: `Deleted ${imageName}` };

        } catch (err) {
          console.error('Error deleting image:', imageName, err);
          return { error: `Failed to delete ${imageName}` };
        }
      }));

      const successfulDeletes = deleteResults.filter(result => result.success);
      const failedDeletes = deleteResults.filter(result => result.error);

      return NextResponse.json({
        message: 'Delete operation completed',
        successfulDeletes,
        failedDeletes
      }, { status: failedDeletes.length > 0 ? 207 : 200 });
    }

  } catch (error) {
    console.error('Error processing delete:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
