import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/*
Key Details for Attachments:
multipart: Playwright automatically sets the Content-Type to multipart/form-data and generates the required boundary strings.
fs.createReadStream(): This is the most efficient way to read a file for upload in Node.js.
Field Names: Ensure the key (e.g., fileField) matches exactly what your API expects (the name attribute in a standard HTML form).
Multiple Files: You can add multiple file keys or pass an array if the API supports it.
*/
test('Upload file attachment via API', async ({ request }) => {
  // Define file path
  const filePath = path.resolve(__dirname, 'test-file.pdf');
  /*
  __dirname (The Starting Point)
  This is a built-in Node.js variable that gives you the absolute path to the folder where your current script file is located.

  path.resolve() (The Connector)
    is function joins the pieces together to create a full, valid path.
    

    createReadStream(filePath)
    Instead of reading the entire file into memory (RAM) all at once (which readFileSync does), it opens a Stream.
    It reads the file in small "chunks" and sends them directly to the API request.
    Performance Benefit: If you are uploading a 500MB file, your test won't freeze or crash because it only processes a few kilobytes at a time.
    */


  // Optional: Check if file exists before sending
  if (!fs.existsSync(filePath)) {
    throw new Error('File not found!');
  }

  const response = await request.post('/api/upload', {
    headers: {
      'Accept': '*/*',
    },
    // Use 'multipart' for attachments
    multipart: {
      // 1. Sending a file
      fileField: fs.createReadStream(filePath),

      // 2. Sending additional form fields alongside the file
      description: 'Monthly Report',
      category: 'Finance'
    }
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  console.log('Upload successful:', body);
});
