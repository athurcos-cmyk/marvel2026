import { useState, useCallback } from "react";
import type { MCUItem } from "../data/timeline";

const STORAGE_KEY = "marvel-watch-v1";

function getStoredIds(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useProgress(items: MCUItem[]) {
  const [watchedIds, setWatchedIds] = useState<string[]>(getStoredIds);

  const toggleWatched = useCallback((id: string) => {
    setWatchedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isWatched = useCallback(
    (id: string) => watchedIds.includes(id),
    [watchedIds]
  );

  const totalWatched = watchedIds.length;
  const totalItems = items.length;

  const getNextUp = useCallback(
    (allItems: MCUItem[], ordem: "cronologica" | "lancamento"): MCUItem | null => {
      const sorted = [...allItems].sort((a, b) =>
        ordem === "cronologica"
          ? a.ordemCronologica - b.ordemCronologica
          : a.ordemLancamento - b.ordemLancamento
      );
      return sorted.find((item) => !watchedIds.includes(item.id)) || null;
    },
    [watchedIds]
  );

  return { watchedIds, toggleWatched, isWatched, totalWatched, totalItems, getNextUp };
}
