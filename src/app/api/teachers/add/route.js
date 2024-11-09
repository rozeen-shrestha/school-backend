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

// Validate image files
const isValidImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
};

export async function POST(request) {
  const contentType = request.headers.get('Content-Type');

  if (!contentType.includes('multipart/form-data')) {
    return NextResponse.json({ error: 'Invalid Content-Type' }, { status: 400 });
  }

  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const subject = formData.get('subject');
  const facebook = formData.get('facebook');
  const instagram = formData.get('instagram');
  const photo = formData.get('photo');
  const description = formData.get('description');

  if (photo && !isValidImageFile(photo)) {
    return NextResponse.json({ error: 'Invalid image file type' }, { status: 400 });
  }

  // Save the image file if it exists
  let photoUrl = null;
  if (photo) {
    const photoId = uuidv4();
    const photoPath = join(process.cwd(), 'public', 'uploads', `${photoId}-${photo.name}`);
    await mkdir(join(process.cwd(), 'public', 'uploads'), { recursive: true });
    await writeFile(photoPath, Buffer.from(await photo.arrayBuffer()));
    photoUrl = `/uploads/${photoId}-${photo.name}`;
  }

  // Save the teacher data to the database
  const db = (await clientPromise).db(dbName);
  const collection = db.collection('teachers');
  await collection.insertOne({
    firstName,
    lastName,
    email,
    phone,
    subject,
    facebook,
    instagram,
    photoUrl,
    description,
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true });
}
