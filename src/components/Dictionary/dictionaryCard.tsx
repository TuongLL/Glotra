import { IDictionary } from "@/types";
import { Volume2 } from "lucide-react";
import React from "react";



export default function DefinitionCard({ dict }: { dict: IDictionary }) {
    const playAudio = () => {
        const audioUrl = dict.phonetics.find(p => p.audio)?.audio;
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    };
    return (
        <div className=" bg-white h-full shadow-md p-6 rounded-md border">
            <h2 className="text-2xl font-semibold mb-1">
                Definitions for <span className="italic">{dict.word}</span>
            </h2>

            <div className="flex gap-2">
                <p className="text-green-600 font-medium mb-4">/{dict.phonetic}/</p>
                <span onClick={playAudio} className="cursor-pointer"> <Volume2 size={24} /></span>

            </div>
            <div className="max-h-[30vh] overflow-y-scroll">
                {dict.meanings.map((meaning, i) => (
                    <div key={i} className="mb-6">
                        <p className="font-medium capitalize text-gray-700 mb-2">
                            {meaning.partOfSpeech}
                        </p>
                        {meaning.definitions.map((def, j) => (
                            <div key={j} className="mb-4 pl-4 border-l-2 border-gray-200">
                                <p className="mb-1">
                                    <span className="font-semibold mr-2">{j + 1}.</span>
                                    {def.definition}
                                </p>


                                {def.synonyms && def.synonyms.length > 0 && (
                                    <p className="mt-1 text-sm">
                                        <span className="font-semibold">Synonyms:</span>{" "}
                                        {def.synonyms.map((s, k) => (
                                            <span
                                                key={k}
                                                className="bg-gray-100 border text-gray-700 px-2 py-0.5 text-xs rounded mr-1 inline-block"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </p>
                                )}

                                {def.antonyms && def.antonyms.length > 0 && (
                                    <p className="mt-1 text-sm">
                                        <span className="font-semibold">Antonyms:</span>{" "}
                                        {def.antonyms.map((a, k) => (
                                            <span
                                                key={k}
                                                className="bg-red-100 border text-red-700 px-2 py-0.5 text-xs rounded mr-1 inline-block"
                                            >
                                                {a}
                                            </span>
                                        ))}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>


            <a
                href={dict.sourceUrls[0]}
                className="text-sm text-blue-500 underline"
                target="_blank"
                rel="noreferrer"
            >
                Source
            </a>
        </div>
    );
}
