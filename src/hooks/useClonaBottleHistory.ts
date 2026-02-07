import { useState, useEffect, useCallback } from "react";

const CLONA_BOTTLE_HISTORY_KEY = "ascencao-clona-bottle-history";

export interface ClonaBottleCompletion {
  id: string;
  completedAt: string; // ISO date-time
  dateKey: string; // YYYY-MM-DD
}

function loadHistory(): ClonaBottleCompletion[] {
  try {
    const saved = localStorage.getItem(CLONA_BOTTLE_HISTORY_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is ClonaBottleCompletion =>
        typeof item === "object" &&
        typeof item.id === "string" &&
        typeof item.completedAt === "string" &&
        typeof item.dateKey === "string"
    );
  } catch {
    return [];
  }
}

function saveHistory(history: ClonaBottleCompletion[]) {
  localStorage.setItem(CLONA_BOTTLE_HISTORY_KEY, JSON.stringify(history));
}

export function useClonaBottleHistory() {
  const [history, setHistory] = useState<ClonaBottleCompletion[]>(loadHistory);

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  const addCompletion = useCallback((dateKey: string) => {
    const newCompletion: ClonaBottleCompletion = {
      id: `clona-${Date.now()}`,
      completedAt: new Date().toISOString(),
      dateKey,
    };
    setHistory(prev => [newCompletion, ...prev]);
  }, []);

  const removeLastCompletion = useCallback((dateKey: string) => {
    setHistory(prev => {
      const idx = prev.findIndex(c => c.dateKey === dateKey);
      if (idx === -1) return prev;
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
  }, []);

  const hasCompletedToday = useCallback((dateKey: string) => {
    return history.some(c => c.dateKey === dateKey);
  }, [history]);

  return {
    history,
    addCompletion,
    removeLastCompletion,
    hasCompletedToday,
  };
}
