import { NextResponse } from 'next/server';
import axios from 'axios';
import env from '@/env';

export async function POST(request: Request) {
    try {
        const body = await request.json(); // ✅ Get POST body
        const query = body.query || '';
        const srcLangCode = body.srcLang.code || undefined;
        const tarLangCode = body.tarLang.code || undefined;
        const { data } = await axios.post(`${env.TRANSLATE_API_URL}/translate`, {
            text: [query],
            target_lang: tarLangCode,
            source_lang: srcLangCode == 'DT' ? undefined : srcLangCode,
        }, {
            headers: {
                'Authorization': env.TRANSLATE_API_KEY,
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