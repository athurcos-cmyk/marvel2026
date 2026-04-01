import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { MCUItem } from "../data/timeline";
import { FASES } from "../hooks/useFilter";

interface Props {
  item: MCUItem | null;
  onClose: () => void;
  watched: boolean;
  onToggle: () => void;
}

export default function MediaModal({ item, onClose, watched, onToggle }: Props) {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot || !item) return null;

  const faseInfo = FASES.find((f) => f.numero === item.fase);

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-zinc-900 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto z-10"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Botao fechar */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg transition-colors"
            >
              &times;
            </button>

            {/* Poster */}
            <div className="aspect-[2/3] w-full max-h-[300px] overflow-hidden rounded-t-xl">
              {item.posterUrl ? (
                <img
                  src={item.posterUrl}
                  alt={item.titulo}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                  <span className="text-zinc-500 text-sm">{item.titulo}</span>
                </div>
              )}
            </div>

            {/* Conteudo */}
            <div className="p-5 space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white">{item.titulo}</h2>
                <p className="text-sm text-zinc-400">{item.tituloOriginal}</p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span
                  className="text-xs font-semibold px-2 py-1 rounded"
                  style={{ backgroundColor: faseInfo?.cor, color: "#000" }}
                >
                  Fase {item.fase}
                </span>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-zinc-700 text-zinc-200">
                  {item.tipo}
                </span>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-zinc-700 text-zinc-200">
                  {item.anoLancamento}
                </span>
              </div>

              <p className="text-sm text-zinc-300">
                <span className="text-zinc-500">Se passa em:</span>{" "}
                {item.anoCronologico}
              </p>

              <p className="text-sm text-zinc-400">
                Ordem cronologica: <span className="text-white font-semibold">#{item.ordemCronologica}</span>
                {" | "}
                Ordem lancamento: <span className="text-white font-semibold">#{item.ordemLancamento}</span>
              </p>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {item.sinopse}
              </p>

              {/* Botao */}
              {!item.lancado ? (
                <button
                  disabled
                  className="w-full py-3 rounded-lg bg-zinc-700 text-zinc-400 font-semibold cursor-not-allowed"
                >
                  Ainda nao lancado
                </button>
              ) : watched ? (
                <button
                  onClick={onToggle}
                  className="w-full py-3 rounded-lg bg-zinc-600 hover:bg-zinc-500 text-white font-semibold transition-colors"
                >
                  Desmarcar
                </button>
              ) : (
                <button
                  onClick={onToggle}
                  className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold transition-colors"
                >
                  Marcar como assistido
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot
  );
}
