'use client';

import { SOURCE_LANGUAGES, TARGET_LANGUAGES } from '@/constants';
import { cn } from '@/lib/utils';
import { ISelectLanguage } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftRight, ChevronDown, ChevronUp, Copy, Sparkles, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslate } from '@/hooks/useTranslate';
import Loading from '../loading';
import HistorySidebar from '@/components/HistorySideBar';
import Dictionary from '@/components/Dictionary';


const notify = () => toast('Copied to clipboard.');

export default function TranslatorPage() {
    const skipEffectRef = useRef(false);

    const router = useRouter();
    const updateURLParams = (srcLang: string, tarLang: string, query: string) => {
        const params = new URLSearchParams();
        if (srcLang) params.set('srcLang', srcLang);
        if (tarLang) params.set('tarLang', tarLang);
        if (query) params.set('query', query);
        router.replace(`?${params.toString()}`, { scroll: false });
    };
    const searchParams = useSearchParams();

    const initialFromLangCode = searchParams.get('srcLang') || SOURCE_LANGUAGES[0].code;
    const initialToLangCode = searchParams.get('tarLang') || TARGET_LANGUAGES[0].code;
    const initialQuery = searchParams.get('query') || '';

    const [debouncedQuery, setDebouncedQuery] = useState('');

    const [srcLang, setSrcLang] = useState<ISelectLanguage>(
        SOURCE_LANGUAGES.find(lang => lang.code === initialFromLangCode) || SOURCE_LANGUAGES[0]
    );
    const [tarLang, setTarLang] = useState<ISelectLanguage>(
        TARGET_LANGUAGES.find(lang => lang.code === initialToLangCode) || TARGET_LANGUAGES[0]
    );
    const [isOpenSrcLang, setIsOpenSrcLang] = useState(false);
    const [isOpenTarLang, setIsOpenTarLang] = useState(false);
    const [isSwap, setIsSwap] = useState(false)
    const [search, setSearch] = useState('');
    const [input, setInput] = useState(initialQuery)
    const { translated, loading, error, example } = useTranslate({
        query: debouncedQuery,
        srcLang: srcLang,
        tarLang: tarLang,
    });

    const swapLanguages = () => {
        skipEffectRef.current = true;
        setIsSwap(!isSwap)
        setSrcLang(tarLang);
        setTarLang(srcLang);
        setDebouncedQuery(translated)
        setInput(translated)
    };
    useEffect(() => {
        if (skipEffectRef.current) {
            skipEffectRef.current = false;
            return;
        }
        const timer = setTimeout(() => {
            setDebouncedQuery(input);
            updateURLParams(srcLang.code, tarLang.code, input);
        }, 500);

        return () => clearTimeout(timer);
    }, [input, srcLang, tarLang]);


    const filteredSourceLangs = SOURCE_LANGUAGES.filter(lang =>
        lang.name.toLowerCase().includes(search.toLowerCase())
    );
    const filteredTargetLangs = TARGET_LANGUAGES.filter(lang =>
        lang.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className="flex h-full flex-1">
            <div className="flex flex-col items-center w-full overflow-hidden h-full bg-[var(--background)] relative   min-w-[500px] ">
                {/* Language Selector section */}
                <div className="w-full  bg-[var(--translator)] h-16 rounded-t-xl border-b-[1px] border-gray-300">
                    <div className="flex items-center justify-center gap-6 py-4">
                        {/* From Language */}
                        <div className="flex justify-end min-w-[200px] items-center gap-1">
                            <button className="flex items-center font-medium text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors duration-200" onClick={() => setIsOpenSrcLang(!isOpenSrcLang)}>
                                <span>{srcLang.name}</span>
                            </button>
                            {isOpenSrcLang ? <ChevronUp size={16} className='text-[var(--text-primary)]' /> : <ChevronDown size={16} className='text-[var(--text-primary)]' />}

                        </div>
                        {/* Swap Button */}
                        <button
                            onClick={swapLanguages}
                            className=" rounded-md p-2 hover:bg-gray-100 transition"
                        >
                            <motion.div
                                animate={{ rotate: isSwap ? 180 : 0 }}
                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                            >
                                <ArrowLeftRight className='text-[var(--text-primary)]' />
                            </motion.div>
                        </button>

                        {/* To Language */}
                        <div className="flex justify-start items-center min-w-[200px] gap-2">
                            <button className="flex items-center font-medium text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors duration-200" onClick={() => setIsOpenTarLang(!isOpenTarLang)}>
                                <span>{tarLang.name}</span>

                            </button>
                            {isOpenTarLang ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>

                    </div>
                </div>

                {/* Input box Section */}
                <div className="flex flex-col lg:flex-row  w-full h-full rounded-b-xl relative">
                    <div className="flex flex-col w-full">
                        <div className="min-h-[100px] max-h-[300px] flex-1 w-full h-full p-6 bg-[var(--translator)] lg:relative">
                            <div className="relative w-full h-full">
                                <button
                                    onClick={() => {
                                        setInput('')
                                    }}
                                    className={cn('absolute  right-0  rounded-md  cursor-pointer hover:bg-gray-100 transition', {
                                        'hidden': input == ''
                                    })}
                                >
                                    <X className='text-gray-300' />
                                </button>
                                <textarea
                                    value={input}
                                    placeholder='Type to translate...'
                                    onChange={({ target }) => {
                                        setInput(target.value)
                                    }}
                                    className="w-full h-full pr-6 bg-[var(--translator)] focus:outline-none text-black resize-none"
                                    rows={1}
                                />
                            </div>

                            {isOpenSrcLang &&
                                <div className="absolute w-full top-0 left-0 h-full ">
                                    <AnimatePresence>
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute z-[0] w-full bg-white border rounded shadow-lg p-4"
                                        >
                                            <input
                                                type="text"
                                                placeholder="Search languages"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                className="w-full mb-4 px-3 py-2 border rounded"
                                            />
                                            <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                                                {filteredSourceLangs.map((lang) => (
                                                    <div
                                                        key={lang.code}
                                                        onClick={() => {
                                                            setSrcLang(lang);
                                                            updateURLParams(lang.code, tarLang.code, input);
                                                            setIsOpenSrcLang(false);
                                                        }}
                                                        className="cursor-pointer hover:bg-gray-100 px-2 py-1 flex items-center justify-between"
                                                    >
                                                        <span className="text-blue-800">{lang.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            }

                        </div>
                        <div className="flex-1 bg-white">
                            <Dictionary key={'2'} query={debouncedQuery} lang={srcLang.code} />
                        </div>
                    </div>
                    <div className="lg:w-0.5 lg:h-full w-full h-0.5 !border-[0.5px] border-gray-300" />
                    <div className=" h-full bg-gray-100 lg:relative flex flex-col w-full ">
                        <div className="p-6 min-h-[100px] max-h-[300px] flex-1">
                            <div className="relative w-full h-full flex flex-col ">
                                <button
                                    onClick={() => {
                                        notify()
                                    }}
                                    className={cn('absolute bottom-0 right-0  rounded-md  cursor-pointer hover:bg-gray-100 transition', {
                                        'hidden': translated == ''
                                    })}
                                >
                                    <Copy />

                                </button>
                                <div className="w-full">
                                    {loading ? <Loading /> : <textarea
                                        className="w-full h-full pr-6  focus:outline-none text-[var(--text-primary)] resize-none "
                                        disabled
                                        value={translated}
                                        rows={1}
                                    />}
                                </div>
                                {
                                    loading ? <div className="animate-pulse space-y-4 mt-4">
                                        <Sparkles className="animate-pulse  w-5 h-5" />
                                        <div className="space-y-2  ">
                                            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                            <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                                            <div className="h-4 bg-gray-300 rounded w-2/3"></div>

                                        </div>

                                    </div> : example && <div className="flex flex-col mt-auto">
                                        <div className=" text-[var(--text-primary)]">Examples  in context</div>
                                        <div className=" text-black whitespace-pre-line ">{example}</div>
                                    </div>
                                }


                            </div>
                            {isOpenTarLang && <div className="absolute z-0 w-full top-0 left-0 h-full ">
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute z-[0] w-full bg-white border rounded shadow-lg p-4"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Search languages"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full mb-4 px-3 py-2 border rounded"
                                        />
                                        <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                                            {filteredTargetLangs.map((lang) => (
                                                <div
                                                    key={lang.code}
                                                    onClick={() => {
                                                        setTarLang(lang);
                                                        updateURLParams(tarLang.code, lang.code, input);
                                                        setIsOpenTarLang(false);
                                                    }}
                                                    className="cursor-pointer hover:bg-gray-100 px-2 py-1 flex items-center justify-between"
                                                >
                                                    <span className="text-blue-800">{lang.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>}
                        </div>
                        <div className="flex-1">
                            <Dictionary key={'1'} query={translated} lang={tarLang.code} />
                        </div>
                    </div>
                </div>

            </div>
            <HistorySidebar />

        </div>

    )
}