import { motion } from "framer-motion";
import type { MCUItem } from "../data/timeline";
import type { FaseInfo } from "../hooks/useFilter";
import MediaCard from "./MediaCard";

interface Props {
  fase: FaseInfo;
  items: MCUItem[];
  isWatched: (id: string) => boolean;
  onCardClick: (item: MCUItem) => void;
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function PhaseSection({ fase, items, isWatched, onCardClick }: Props) {
  if (items.length === 0) return null;

  return (
    <section id={`fase-${fase.numero}`} className="relative mb-8">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden rounded-xl -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${fase.imagemFundo})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${fase.cor}15 0%, ${fase.corSecundaria}15 100%)`,
          }}
        />
      </div>

      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h2 className="text-lg font-bold" style={{ color: fase.cor }}>
          Fase {fase.numero} — {fase.nome}
        </h2>
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 px-4 pb-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {items.map((item) => (
          <motion.div key={item.id} variants={cardVariant}>
            <MediaCard
              item={item}
              watched={isWatched(item.id)}
              onClick={() => onCardClick(item)}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
