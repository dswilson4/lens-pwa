'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default function ContentUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  return (
    <>
      <h1>Upload Your Content</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          console.log('rags');
          const file = inputFileRef.current.files[0];

          const response = await fetch(
            `/api/feed/upload?filename=${file.name}`,
            {
              method: 'POST',
              body: file,
            },
          );

          const newBlob = (await response.json()) as PutBlobResult;

          setBlob(newBlob);

          console.log(newBlob.url);
          const caption = '';
          const creatorWalletAddress = '';

          try {
              const newMedia = await prisma.media.create({
                  data: {
                      uri: newBlob.url,
                      caption: caption || '',  // If caption is not provided, use an empty string
                      creatorWalletAddress: creatorWalletAddress || ''
                  }
              });

              return NextResponse.json(newMedia, { status: 201 });

          } catch (error) {
              // @ts-ignore
              return NextResponse.json({ message: `Failed to create new Media: ${error.message}` }, { status: 500 });
          }
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}

