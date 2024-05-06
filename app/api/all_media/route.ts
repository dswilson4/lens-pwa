import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(request: NextRequest) {

    const data = await request.text();

    let parsedBody;
    try {
        parsedBody = JSON.parse(data);
    } catch (error) {
        return NextResponse.json({ message: 'Invalid JSON in request body.' }, { status: 400 });
    }

    const { creatorWalletAddress, subscriberWalletAddress } = parsedBody;
    if ( !creatorWalletAddress || !subscriberWalletAddress ) {
        return NextResponse.json({ message: 'creatorWalletAddress and subscriberWalletAddress are required fields.' }, { status: 400 });
    }

    try {
        // Check for Subscription mapping
        const subscription = await prisma.subscription.findMany({
          where: {
            creatorWalletAddress: {
              equals: creatorWalletAddress, // Default mode
            },
            subscriberWalletAddress: {
              equals: subscriberWalletAddress,
            },
          },
        });

        if ( subscription.length > 0 ) {
            console.log(`Succesfully discovered subscription for subscriber ${subscriberWalletAddress} to ${creatorWalletAddress}`);

            const media = await prisma.media.findMany({
              where: {
                creatorWalletAddress: {
                  equals: creatorWalletAddress, // Default mode
                },
              },
            });
        } else {
            console.log(`No subscription found for ${subscriberWalletAddress} to ${creatorWalletAddress}`);
        }
    } catch (error) {
        // @ts-ignore
        return NextResponse.json({ message: `Failed to query all Media: ${error.message}` }, { status: 500 });
    }
}
