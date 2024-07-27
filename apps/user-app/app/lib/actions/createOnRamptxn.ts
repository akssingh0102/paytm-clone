'use server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import prisma from '@repo/db/client';


export async function CreateOnRampTransaction(amount: number, provider: 'HDFC Bank' | 'Axis Bank') {
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    const token = Math.random().toString();

    if (!userId) {
        return { message: 'User not logged in' }
    }

    await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            amount: amount * 100,
            status: 'Processing',
            startTime: new Date(),
            provider,
            token
        }
    })
    return { message: 'OnRamp transaction added' }
}