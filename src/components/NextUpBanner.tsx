import type { MCUItem } from "../data/timeline";

interface Props {
  nextUp: MCUItem | null;
  totalWatched: number;
  totalItems: number;
}

export default function NextUpBanner({ nextUp, totalWatched, totalItems }: Props) {
  const isComplete = totalWatched === totalItems;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-[#E23636] text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center gap-3">
        {isComplete ? (
          <p className="text-sm font-semibold text-center w-full">
            Parabens! Voces completaram o MCU!
          </p>
        ) : nextUp ? (
          <>
            {nextUp.posterUrl ? (
              <img
                src={nextUp.posterUrl}
                alt={nextUp.titulo}
                className="w-[40px] h-[60px] object-cover rounded flex-shrink-0"
              />
            ) : (
              <div className="w-[40px] h-[60px] bg-red-800 rounded flex-shrink-0" />
            )}
            <div className="min-w-0">
              {!nextUp.lancado ? (
                <p className="text-sm font-semibold truncate">
                  Aguardando lancamento: {nextUp.titulo}
                </p>
              ) : (
                <p className="text-sm font-semibold truncate">
                  Proximo a assistir: {nextUp.titulo}
                </p>
              )}
              <p className="text-xs opacity-80">#{nextUp.ordemCronologica} na cronologia</p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
