import { NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { getToken } from "next-auth/jwt";
import { v4 as uuidv4 } from 'uuid';

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

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadDir = join(process.cwd(), 'public', 'media', 'news');
    await mkdir(uploadDir, { recursive: true });

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
        return {
          filename,
          path: `/media/news/${filename}`,
        };
      } catch (err) {
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
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const token = await getToken({ req: request });
  if (token?.role != 'admin') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { path } = await request.json();
    if (!path || !path.startsWith('/news/')) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }
    const filePath = join(process.cwd(), 'public', path);
    await unlink(filePath);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
