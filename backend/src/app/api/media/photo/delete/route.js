import { NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';
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

export async function DELETE(request) {
  const token = await getToken({ req: request });

  // Check if user is authenticated
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Parse request body
    const body = await request.json();
    console.log('Request body:', body);

    // Check if the request contains a single image or multiple images
    let imageNames = [];
    if (typeof body.imageName === 'string') {
      imageNames = [body.imageName]; // Single image case
    } else if (Array.isArray(body.imageNames)) {
      imageNames = body.imageNames; // Multiple images case
    } else {
      return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);

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

  } catch (error) {
    console.error('Error processing delete:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
