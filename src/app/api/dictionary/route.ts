import { NextResponse } from 'next/server';
import axios from 'axios';
import env from '@/env';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('query');
        if (!query) {
            return NextResponse.json({ error: 'Missing query' }, { status: 400 });
        }
        const { data } = await axios.get(`${env.DICTIONARY_API_URL}/entries/en/${query}`);
        return NextResponse.json(data);
    } catch (error) {
        console.error('GET /api/dictionary error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}