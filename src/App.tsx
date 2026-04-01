import { useState } from "react";
import { timeline } from "./data/timeline";
import type { MCUItem } from "./data/timeline";
import { useProgress } from "./hooks/useProgress";
import { useFilter, FASES } from "./hooks/useFilter";
import { useTmdbPosters } from "./hooks/useTmdbPosters";
import NextUpBanner from "./components/NextUpBanner";
import ProgressBar from "./components/ProgressBar";
import PhaseNav from "./components/PhaseNav";
import PhaseSection from "./components/PhaseSection";
import FloatingNav from "./components/FloatingNav";
import OrderToggle from "./components/OrderToggle";
import MediaModal from "./components/MediaModal";

function App() {
  const { itemsWithPosters, getItemWithPoster } = useTmdbPosters(timeline);
  const { isWatched, toggleWatched, totalWatched, totalItems, getNextUp } =
    useProgress(itemsWithPosters);
  const { ordem, faseAtiva, toggleOrdem, setFase, getItemsFiltrados } =
    useFilter();
  const [selectedItem, setSelectedItem] = useState<MCUItem | null>(null);

  const nextUp = getNextUp(itemsWithPosters, ordem);
  const filteredItems = getItemsFiltrados(itemsWithPosters);

  const fases = faseAtiva
    ? [FASES.find((f) => f.numero === faseAtiva)!]
    : FASES;

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-inter text-white">
      <NextUpBanner
        nextUp={nextUp}
        totalWatched={totalWatched}
        totalItems={totalItems}
      />
      <ProgressBar totalWatched={totalWatched} totalItems={totalItems} />
      <PhaseNav faseAtiva={faseAtiva} onSetFase={setFase} />

      <main className="pt-[150px] pb-24 max-w-6xl mx-auto px-2">
        {fases.map((fase) => {
          const faseItems = filteredItems.filter((i) => i.fase === fase.numero);
          return (
            <PhaseSection
              key={fase.numero}
              fase={fase}
              items={faseItems}
              isWatched={isWatched}
              onCardClick={setSelectedItem}
            />
          );
        })}
      </main>

      <FloatingNav faseAtiva={faseAtiva} />
      <OrderToggle ordem={ordem} onToggle={toggleOrdem} />

      <MediaModal
        item={selectedItem ? getItemWithPoster(selectedItem) : null}
        onClose={() => setSelectedItem(null)}
        watched={selectedItem ? isWatched(selectedItem.id) : false}
        onToggle={() => {
          if (selectedItem) toggleWatched(selectedItem.id);
        }}
      />
    </div>
  );
}

export default App;
