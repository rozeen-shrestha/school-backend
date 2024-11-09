// src/app/api/file/[...path]/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// This line forces dynamic behavior for the route
export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  const { path: filePathArray } = params; // Get the path as an array
  const filename = filePathArray.join('/'); // Join the array to create the full path

  // Construct the full file path in the public directory
  const fullFilePath = path.join(process.cwd(), 'public', filename);

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
        // Add more file types as needed
      }

      // Return the file as a response
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `inline; filename="${path.basename(fullFilePath)}"`,
        },
      });
    } else {
      // File not found
      return new NextResponse('File not found', { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
