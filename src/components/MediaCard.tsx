import { motion } from "framer-motion";
import type { MCUItem } from "../data/timeline";

interface Props {
  item: MCUItem;
  watched: boolean;
  onClick: () => void;
  onToggle: () => void;
}

export default function MediaCard({ item, watched, onClick, onToggle }: Props) {
  const tipoCor =
    item.tipo === "Filme"
      ? "bg-red-600"
      : item.tipo === "Serie"
      ? "bg-blue-600"
      : "bg-yellow-600";

  return (
    <motion.div
      className="relative cursor-pointer rounded-lg overflow-hidden group"
      onClick={watched ? undefined : onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Poster */}
      <div className="aspect-[2/3] relative bg-zinc-800">
        {item.posterUrl ? (
          <img
            src={item.posterUrl}
            alt={item.titulo}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-800">
            <span className="text-zinc-500 text-xs text-center px-2 font-medium">
              {item.titulo}
            </span>
          </div>
        )}

        {/* Badge tipo */}
        <span
          className={`absolute top-2 left-2 ${tipoCor} text-white text-[10px] font-semibold px-2 py-0.5 rounded`}
        >
          {item.tipo}
        </span>

        {/* Badge Em breve */}
        {!item.lancado && (
          <span className="absolute top-2 right-2 bg-amber-500 text-black text-[10px] font-semibold px-2 py-0.5 rounded">
            Em breve
          </span>
        )}

        {/* Numero cronologico */}
        <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          #{item.ordemCronologica}
        </span>

        {/* Overlay assistido — clique direto desmarca */}
        {watched && (
          <motion.div
            className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            <motion.svg
              className="w-10 h-10 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
            <span className="text-[10px] text-green-400 font-semibold bg-black/60 px-2 py-0.5 rounded">
              Assistido
            </span>
          </motion.div>
        )}

        {/* Hint de marcar ao hover (nao assistido) */}
        {!watched && item.lancado && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
            <span className="text-[10px] text-white font-semibold bg-green-600 px-2 py-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              + Marcar
            </span>
          </div>
        )}
      </div>

      {/* Titulo */}
      <div className="p-2">
        <p className="text-xs font-medium text-zinc-200 truncate">
          {item.titulo}
        </p>
        <p className="text-[10px] text-zinc-500">{item.anoLancamento}</p>
      </div>
    </motion.div>
  );
}
