import { dintionaryService } from "@/services";
import { IDictionary } from "@/types";
import { useEffect, useState } from "react";
import DefinitionCard from "./dictionaryCard";

interface Props {
    query: string;
    lang: string;
}
export default function Dictionary({ query, lang }: Props) {
    const [dict, setDict] = useState<IDictionary | null>(null)
    useEffect(() => {
        setDict(null)
        const getDictionary = async (query: string) => {
            const data = await dintionaryService.getDictionary(query)
            if (data?.[0]) setDict(data[0])
        }
        if (query && query.split(' ').length == 1 && ['en', 'dt'].includes(lang.toLocaleLowerCase())) {
            getDictionary(query)
        }

    }, [query])
    return (
        dict && <DefinitionCard dict={dict} />
    );
}