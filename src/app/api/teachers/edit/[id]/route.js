import { NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { getToken } from "next-auth/jwt";
import { MongoClient, ObjectId } from "mongodb";
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

export async function POST(request, { params }) {
  const token = await getToken({ req: request });

  if (token?.role !== 'admin') {
    console.warn('[API] [teachers/edit] Unauthorized access attempt');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  if (!id || !ObjectId.isValid(id)) {
    console.warn('[API] [teachers/edit] Invalid Teacher ID:', id);
    return NextResponse.json({ error: 'Invalid Teacher ID' }, { status: 400 });
  }

  const contentType = request.headers.get('Content-Type');

  if (!contentType.includes('multipart/form-data')) {
    console.warn('[API] [teachers/edit] Invalid Content-Type:', contentType);
    return NextResponse.json({ error: 'Invalid Content-Type' }, { status: 400 });
  }

  try {
    const formData = await request.formData();
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const subject = formData.get('subject');
    const customSubject = formData.get('customSubject');
    const facebook = formData.get('facebook');
    const instagram = formData.get('instagram');
    const image = formData.get('image');
    const description = formData.get('description');

    if (image && !isValidImageFile(image)) {
      console.warn('[API] [teachers/edit] Invalid image file type');
      return NextResponse.json({ error: 'Invalid image file type' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection('teachers');

    // Fetch the current teacher data to get the old photo URL
    const teacher = await collection.findOne({ _id: new ObjectId(id) });
    if (!teacher) {
      console.warn('[API] [teachers/edit] Teacher not found:', id);
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }

    // Save the new image file if it exists and delete the old one
    let photoUrl = teacher.photoUrl;
    if (image) {
      const photoId = uuidv4();
      const photoPath = join(process.cwd(), 'public', 'uploads', `${photoId}-${image.name}`);
      await mkdir(join(process.cwd(), 'public', 'uploads'), { recursive: true });
      await writeFile(photoPath, Buffer.from(await image.arrayBuffer()));
      photoUrl = `/uploads/${photoId}-${image.name}`;

      // Delete the old photo file if it exists
      if (teacher.photoUrl) {
        const oldPhotoPath = join(process.cwd(), 'public', teacher.photoUrl);
        try {
          await unlink(oldPhotoPath);
          console.log('[API] [teachers/edit] Deleted old photo:', oldPhotoPath);
        } catch (error) {
          console.error('Error deleting old photo:', error);
        }
      }
    }

    const updateData = {
      firstName,
      lastName,
      email,
      phone,
      subject,
      customSubject,
      facebook,
      instagram,
      description,
      photoUrl,
    };

    // Update the teacher data in the database
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      console.warn('[API] [teachers/edit] Teacher not found on update:', id);
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }

    console.log('[API] [teachers/edit] Teacher updated:', id);
    return NextResponse.json({ success: true, message: 'Teacher updated successfully' });
  } catch (error) {
    console.error('Error updating teacher:', error);
    return NextResponse.json({ error: 'Failed to update teacher' }, { status: 500 });
  }
}
