import { motion } from "framer-motion";

interface Props {
  totalWatched: number;
  totalItems: number;
}

export default function ProgressBar({ totalWatched, totalItems }: Props) {
  const pct = totalItems > 0 ? Math.round((totalWatched / totalItems) * 100) : 0;

  return (
    <div className="fixed top-[60px] left-0 right-0 z-30 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
          <span>
            {totalWatched} de {totalItems} assistidos ({pct}%)
          </span>
        </div>
        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-red-700 via-red-500 to-red-400"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
