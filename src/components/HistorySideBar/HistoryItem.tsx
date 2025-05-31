import { History } from "@prisma/client";

interface HistoryItemProps {
    data: History
  }
  
  export  function HistoryItem({ data }: HistoryItemProps) {
    return (
      <div className="mb-3 p-2 hover:bg-gray-200 rounded cursor-pointer">
        <div className="text-xs text-gray-500">{data.srcLangCode} → {data.tarLangCode}</div>
        <div className=" text-[var(--muted-foreground)] text-sm">{data.originText}</div>
        <div className=" text-[var(--muted-foreground)] text-sm">{data.translatedText}</div>
      </div>
    );
  }
  