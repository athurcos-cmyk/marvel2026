import { motion } from "framer-motion";
import type { MCUItem } from "../data/timeline";
import { FASES } from "../hooks/useFilter";
import MediaCard from "./MediaCard";

interface Props {
  items: MCUItem[];
  isWatched: (id: string) => boolean;
  onCardClick: (item: MCUItem) => void;
  onCardToggle: (id: string) => void;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function ChronoView({ items, isWatched, onCardClick, onCardToggle }: Props) {
  return (
    <div className="px-2">
      <div className="flex items-center gap-2 mb-4 px-2">
        <span className="text-xs text-zinc-500 font-medium">
          Todos os {items.length} títulos em ordem cronológica
        </span>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {items.map((item) => {
          const faseInfo = FASES.find((f) => f.numero === item.fase);
          return (
            <motion.div key={item.id} variants={cardVariant} className="relative">
              {/* Indicador de fase no topo do card */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-lg z-10"
                style={{ backgroundColor: faseInfo?.cor ?? "#444" }}
              />
              <MediaCard
                item={item}
                watched={isWatched(item.id)}
                onClick={() => onCardClick(item)}
                onToggle={() => onCardToggle(item.id)}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
