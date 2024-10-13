import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { join } from 'path';
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

export async function POST(request) {
  const token = await getToken({ req: request });

  // Check if user is authenticated
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const oldImageName = formData.get('oldImageName');
    const categoryId = formData.get('categoryId');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);

    // Find the old image in the database
    const oldImage = await db.collection('uploads').findOne({ filename: oldImageName });

    if (!oldImage) {
      return NextResponse.json({ error: 'Old image not found' }, { status: 404 });
    }

    // Delete the old file from the filesystem
    const oldFilePath = join(process.cwd(), 'public', oldImage.path);
    await fs.unlink(oldFilePath);

    // Generate a new filename
    const newFilename = `${Date.now()}-${file.name}`;
    const category = oldImage.category; // Use the existing category
    const newRelativePath = `/media/photo/${category}/${newFilename}`;
    const newFilePath = join(process.cwd(), 'public', newRelativePath);

    // Ensure the directory exists
    const dir = join(process.cwd(), 'public', 'media', 'photo', category);
    await fs.mkdir(dir, { recursive: true });

    // Write the new file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(newFilePath, buffer);

    // Update the database record
    await db.collection('uploads').updateOne(
      { filename: oldImageName },
      {
        $set: {
          originalFilename: file.name,
          filename: newFilename,
          path: newRelativePath,
          uploader: token.name || 'unknown', // Use the authenticated user's name
          uploadDate: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
        }
      }
    );

    return NextResponse.json({ message: 'Image replaced successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error processing replace:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
