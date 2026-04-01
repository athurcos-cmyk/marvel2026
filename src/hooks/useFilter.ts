import { useState, useCallback } from "react";
import type { MCUItem } from "../data/timeline";

export type Ordem = "cronologica" | "lancamento";

export interface FaseInfo {
  numero: number;
  nome: string;
  cor: string;
  corSecundaria: string;
  imagemFundo: string;
}

export const FASES: FaseInfo[] = [
  {
    numero: 1,
    nome: "Os Primeiros Vingadores",
    cor: "#F5A623",
    corSecundaria: "#1B3A6B",
    imagemFundo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
  },
  {
    numero: 2,
    nome: "A Ascensao dos Herois",
    cor: "#4A0E8F",
    corSecundaria: "#C0C0C0",
    imagemFundo: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200",
  },
  {
    numero: 3,
    nome: "A Guerra Infinita",
    cor: "#FF6B35",
    corSecundaria: "#0D0D0D",
    imagemFundo: "https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=1200",
  },
  {
    numero: 4,
    nome: "O Multiverso",
    cor: "#00FF87",
    corSecundaria: "#FF0040",
    imagemFundo: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200",
  },
  {
    numero: 5,
    nome: "A Nova Era",
    cor: "#00D4FF",
    corSecundaria: "#1A1A2E",
    imagemFundo: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200",
  },
  {
    numero: 6,
    nome: "A Saga do Multiverso",
    cor: "#FF2020",
    corSecundaria: "#FFD700",
    imagemFundo: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200",
  },
];

export function useFilter() {
  const [ordem, setOrdem] = useState<Ordem>("cronologica");
  const [faseAtiva, setFaseAtiva] = useState<number | null>(null);

  const toggleOrdem = useCallback(() => {
    setOrdem((prev) => (prev === "cronologica" ? "lancamento" : "cronologica"));
  }, []);

  const setFase = useCallback((fase: number | null) => {
    setFaseAtiva(fase);
  }, []);

  const getItemsFiltrados = useCallback(
    (items: MCUItem[]): MCUItem[] => {
      let filtered = faseAtiva ? items.filter((i) => i.fase === faseAtiva) : items;
      return [...filtered].sort((a, b) =>
        ordem === "cronologica"
          ? a.ordemCronologica - b.ordemCronologica
          : a.ordemLancamento - b.ordemLancamento
      );
    },
    [ordem, faseAtiva]
  );

  return { ordem, faseAtiva, toggleOrdem, setFase, getItemsFiltrados };
}
