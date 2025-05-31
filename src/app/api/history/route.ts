import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// GET /api/history?userId=xxx
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
        }

        const histories = await prisma.history.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(histories);
    } catch (error) {
        console.error('GET /api/history error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/history
export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const body = await req.json();
        const { srcLangCode, tarLangCode, originText, translatedText } = body;
        if (!srcLangCode || !tarLangCode || !originText || !translatedText) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const history = await prisma.history.create({
            data: {
                userId,
                srcLangCode,
                tarLangCode,
                originText,
                translatedText
            },
        });
        return NextResponse.json(history);
    } catch (error) {
        console.error('POST /api/history error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
