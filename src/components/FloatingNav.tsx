import { motion } from "framer-motion";
import { FASES } from "../hooks/useFilter";

interface Props {
  faseAtiva: number | null;
}

export default function FloatingNav({ faseAtiva }: Props) {
  if (faseAtiva !== null) return null;

  const scrollToPhase = (numero: number) => {
    const el = document.getElementById(`fase-${numero}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div
      className="fixed right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      {FASES.map((fase) => (
        <div key={fase.numero} className="group relative">
          <button
            onClick={() => scrollToPhase(fase.numero)}
            className="w-9 h-9 rounded-full text-xs font-bold text-black shadow-lg hover:scale-110 transition-transform"
            style={{ backgroundColor: fase.cor }}
          >
            F{fase.numero}
          </button>
          <span className="absolute right-12 top-1/2 -translate-y-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {fase.nome}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
