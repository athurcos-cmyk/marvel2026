import { motion } from "framer-motion";
import { FASES } from "../hooks/useFilter";

interface Props {
  faseAtiva: number | null;
  onSetFase: (fase: number | null) => void;
}

export default function PhaseNav({ faseAtiva, onSetFase }: Props) {
  return (
    <div className="fixed top-[100px] left-0 right-0 z-30 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto hide-scrollbar py-2">
          <button
            onClick={() => onSetFase(null)}
            className={`relative flex-shrink-0 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              faseAtiva === null
                ? "bg-white/10 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Todas
            {faseAtiva === null && (
              <motion.div
                layoutId="phase-underline"
                className="absolute bottom-0 left-2 right-2 h-0.5 bg-red-500 rounded-full"
              />
            )}
          </button>
          {FASES.map((fase) => (
            <button
              key={fase.numero}
              onClick={() => onSetFase(fase.numero)}
              className={`relative flex-shrink-0 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                faseAtiva === fase.numero
                  ? "bg-white/10 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Fase {fase.numero}
              {faseAtiva === fase.numero && (
                <motion.div
                  layoutId="phase-underline"
                  className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                  style={{ backgroundColor: fase.cor }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
