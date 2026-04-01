import { motion } from "framer-motion";
import type { Ordem } from "../hooks/useFilter";

interface Props {
  ordem: Ordem;
  onToggle: () => void;
}

export default function OrderToggle({ ordem, onToggle }: Props) {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed bottom-4 left-4 z-30 bg-zinc-800/90 backdrop-blur-sm text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-zinc-700 transition-colors border border-zinc-700"
      whileTap={{ scale: 0.95 }}
    >
      <motion.svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        animate={{ rotate: ordem === "cronologica" ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
        />
      </motion.svg>
      <span className="text-xs font-semibold">
        {ordem === "cronologica" ? "Cronologica" : "Lancamento"}
      </span>
    </motion.button>
  );
}
