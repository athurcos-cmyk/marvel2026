import { useState, useEffect } from "react";
import type { MCUItem } from "../data/timeline";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;
const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const CACHE_KEY = "marvel-watch-posters-v1";

function getCachedPosters(): Record<string, string> {
  try {
    const stored = localStorage.getItem(CACHE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function useTmdbPosters(items: MCUItem[]) {
  const [posters, setPosters] = useState<Record<string, string>>(getCachedPosters);

  useEffect(() => {
    if (!API_KEY) return;

    const cached = getCachedPosters();
    const toFetch = items.filter(
      (item) => item.tmdbId > 0 && !cached[item.id]
    );

    if (toFetch.length === 0) return;

    let cancelled = false;

    async function fetchPosters() {
      const newPosters: Record<string, string> = { ...cached };

      for (const item of toFetch) {
        if (cancelled) break;
        try {
          const type = item.tipo === "Filme" ? "movie" : "tv";
          const res = await fetch(
            `https://api.themoviedb.org/3/${type}/${item.tmdbId}?api_key=${API_KEY}&language=pt-BR`
          );
          if (!res.ok) continue;
          const data = await res.json();
          if (data.poster_path) {
            newPosters[item.id] = `${IMG_BASE}${data.poster_path}`;
          }
        } catch {
          // silently skip
        }
      }

      if (!cancelled) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(newPosters));
        setPosters(newPosters);
      }
    }

    fetchPosters();
    return () => { cancelled = true; };
  }, [items]);

  const getItemWithPoster = (item: MCUItem): MCUItem => {
    if (posters[item.id]) {
      return { ...item, posterUrl: posters[item.id] };
    }
    return item;
  };

  const itemsWithPosters = items.map(getItemWithPoster);

  return { itemsWithPosters, getItemWithPoster };
}
