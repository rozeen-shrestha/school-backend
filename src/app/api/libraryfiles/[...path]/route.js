import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import fs from 'fs';
import path from 'path';

// This line forces dynamic behavior for the route
export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  // Get the token (JWT) from the request headers
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token or missing role, return Unauthorized
  if (!token || !token.role) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Get the file path parameters
  const { path: filePathArray } = params;
  const filename = filePathArray.join('/'); // Join the array to create the full path

  // Determine the base directory based on the first part of the path
  let baseDir;
  if (filePathArray[0] === 'covers') {
    baseDir = path.join(process.cwd(), 'elibrary', 'library', 'covers');
  } else if (filePathArray[0] === 'books') {
    baseDir = path.join(process.cwd(), 'elibrary', 'library', 'books');
  } else {
    return new NextResponse('Invalid path', { status: 400 });
  }

  // Construct the full file path
  const fullFilePath = path.join(baseDir, ...filePathArray.slice(1));

  // Check if the user has permission to access the file
  const userPermissions = token.permissions?.pdfs || [];
  const isAllPermission = userPermissions.includes('all');

  // If user doesn't have "all" permission, check if the file is in their permitted files
  if (!isAllPermission && !userPermissions.includes(filename)) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Log the constructed file path for debugging
  console.log(`Constructed file path: ${fullFilePath}`);

  try {
    // Check if the file exists
    if (fs.existsSync(fullFilePath)) {
      // Read the file
      const fileBuffer = fs.readFileSync(fullFilePath);

      // Determine the content type based on the file extension
      const ext = path.extname(fullFilePath).toLowerCase();
      let contentType = 'application/octet-stream'; // Default type

      switch (ext) {
        case '.png':
          contentType = 'image/png';
          break;
        case '.jpg':
        case '.jpeg':
          contentType = 'image/jpeg';
          break;
        case '.gif':
          contentType = 'image/gif';
          break;
        case '.pdf':
          contentType = 'application/pdf';
          break;
        // Add more file types as needed
      }

      // Return the file as a response
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': 'inline; filename="' + path.basename(fullFilePath) + '"',
        },
      });
    } else {
      // File not found
      console.error(`File not found: ${fullFilePath}`);
      return new NextResponse('File not found', { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
