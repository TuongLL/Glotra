import { useState, useEffect } from 'react';
import axios from 'axios';

interface UseTranslateProps {
    query: string;
    srcLang?: {
        code: string,
        name: string
    };
    tarLang?: {
        code: string,
        name: string
    };
}

interface ITranslateResponse {
    translated: string;
    loading: boolean;
    example: string;
    error: string | null,
}


export const useTranslate = ({ query, srcLang, tarLang }: UseTranslateProps) => {

    const [res, setRes] = useState<ITranslateResponse>({
        translated: '',
        example: '',
        loading: false,
        error: ''
    })

    useEffect(() => {
        if (!query || !tarLang) {
            setRes({ ...res })
            return;
        }

        const fetchTranslation = async () => {
            try {
                setRes({ ...res, loading: true });
                const { data: translate } = await axios.post('/api/translate', { query, srcLang, tarLang });
                const result = translate?.translations?.[0]?.text ?? '';
                const { data: openai } = await axios.post('/api/openai', { query: result, tarLang });
                await axios.post('/api/history', { srcLangCode: srcLang?.code ?? 'DT', tarLangCode: tarLang.code, originText: query, translatedText: result });
                setRes({
                    error: null,
                    translated: result,
                    example: openai?.output?.[0]?.content?.[0]?.text,
                    loading: false
                })
            } catch (err: any) {
                setRes({ ...res, error: err.response?.data?.error || 'Translation failed' });
            }
        };

        fetchTranslation();
    }, [query, srcLang, tarLang]);

    return { ...res };
};
