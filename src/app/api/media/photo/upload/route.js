import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getToken } from "next-auth/jwt";
import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from 'uuid';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export const dynamic = 'force-dynamic';

const isValidImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
};

export async function POST(request) {
  const token = await getToken({ req: request });


  if (token?.role != 'admin') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll('files');
    const category = formData.get('category');

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    if (!category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    const uploadDir = join(process.cwd(), 'public', 'media', 'photo', category);

    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') {
        console.error('Error creating directory:', err);
        return NextResponse.json({ error: 'Failed to create upload directory' }, { status: 500 });
      }
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const currentDate = new Date().toISOString().split('T')[0];

    const uploadResults = await Promise.all(files.map(async (file) => {
      if (!isValidImageFile(file)) {
        return { error: `Invalid file type for ${file.name}`, filename: file.name };
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const uniqueId = uuidv4();
      const ext = file.name.split('.').pop();
      const filename = `${uniqueId}.${ext}`;
      const filePath = join(uploadDir, filename);

      try {
        await writeFile(filePath, buffer);

        const result = await db.collection('uploads').insertOne({
          originalFilename: file.name,
          filename,
          path: `/media/photo/${category}/${filename}`,
          category: category,
          uploader: token.name || 'unknown', // Assuming token.name contains the username
          uploadDate: currentDate
        });

        return {
          _id: result.insertedId,
          originalFilename: file.name,
          filename,
          path: `/media/photo/${category}/${filename}`,
          category: category,
          uploader: token.name || 'unknown', // Assuming token.name contains the username
          uploadDate: currentDate
        };
      } catch (err) {
        console.error('Error processing file:', file.name, err);
        return { error: `Failed to save file ${file.name}`, filename: file.name };
      }
    }));

    const successfulUploads = uploadResults.filter(result => !result.error);
    const failedUploads = uploadResults.filter(result => result.error);

    return NextResponse.json({
      message: 'File upload process completed',
      successfulUploads,
      failedUploads
    }, { status: failedUploads.length > 0 ? 207 : 201 });

  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
