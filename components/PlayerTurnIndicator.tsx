import { useConnectFourStore } from "@/stores/useConnectFourStore";
import { Player } from "@/types";

type PlayerTurnIndicatorProps = {
  player: Player;
};

export function PlayerTurnIndicator({ player }: PlayerTurnIndicatorProps) {
  // grab relevant context from game store
  const currentTurn = useConnectFourStore((state) => state.currentTurn);
  const isActive = currentTurn === player;

  // return turn indicator colored based on player and active states
  if (player === "red") {
    return (
      <span
        className={`text-sm rounded-md p-1  ${
          isActive
            ? "font-bold opacity-100 bg-red-100 text-red-600"
            : "opacity-10 text-zinc-500"
        }`}
      >
        Turn
      </span>
    );
  } else {
    // yellow
    return (
      <span
        className={`text-sm rounded-md p-1  ${
          isActive
            ? "font-bold opacity-100 bg-yellow-100 text-yellow-600"
            : "opacity-10 text-zinc-500"
        }`}
      >
        Turn
      </span>
    );
  }
}
