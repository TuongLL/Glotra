import { NextResponse } from 'next/server';
import axios from 'axios';
import env from '@/env';
import { prompt } from '@/lib';

export async function POST(request: Request) {
    try {
        const body = await request.json(); // ✅ Get POST body
        const query = body.query || '';
        const tarLang = body.tarLang || undefined;
        const { data } = await axios.post(`${env.OPENAI_API_URL}/responses`, {
            input: prompt(query, tarLang),
            model: env.OPENAI_API_MODEL,
        }, {
            headers: {
                'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}