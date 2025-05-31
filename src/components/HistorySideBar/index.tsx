'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { historyService } from '@/services';
import { HistoryItem } from './HistoryItem';
import { HistorySkeleton } from './HistorySkeleton';
import { useHistorySidebarStore } from '@/app/stores';

export default function HistorySidebar() {
    const isOpen = useHistorySidebarStore((state) => state.isOpen);
    const [histories, setHistories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { userId } = useAuth();
    useEffect(() => {
        if (!userId) return;
        const fetchHistories = async () => {
            try {
                const data = await historyService.getHistories(userId);
                setHistories(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistories();
    }, [userId]);
    if (!isOpen) return null;

    return (
        <aside className="w-80 bg-[var(--background)]  border-l border-[var(--border)] h-screen p-4 overflow-y-auto shadow-xl hover:shadow-xl">
            <h2 className="text-lg font-semibold mb- text-[var(--muted-foreground)] ">History</h2>
            {loading ? (
                <HistorySkeleton />
            ) : histories.length > 0 ? (
                histories.map((item) => <HistoryItem key={item.id} data={item} />)
            ) : (
                <p className="text-sm text-gray-500">No history yet.</p>
            )}
        </aside>
    );
}
