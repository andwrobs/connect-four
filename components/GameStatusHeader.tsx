import { PlayerCard } from "./PlayerCard";

export function GameStatusHeader() {
  return (
    <div className="flex items-center gap-6 pt-4">
      <PlayerCard player={"red"} position={"left"} />
      <VersusSymbol />
      <PlayerCard player={"yellow"} position={"right"} />
    </div>
  );
}

function VersusSymbol() {
  return (
    // bg + padding = clip path border
    <div
      className="flex items-center bg-neutral-100 p-1"
      style={{
        clipPath:
          "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)",
      }}
    >
      {/* content */}
      <div
        className="flex justify-center items-center p-2 font-bold bg-white text-neutral-400"
        style={{
          clipPath:
            "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)",
        }}
      >
        <span>VS</span>
      </div>
    </div>
  );
}
