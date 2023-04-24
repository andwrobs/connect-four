import { useConnectFourStore } from "@/stores/useConnectFourStore";
import { playerInfoMap } from "@/types";
import Image from "next/image";

export function GameResultModal() {
  const gameStatus = useConnectFourStore((state) => state.gameStatus);

  return (
    <div
      className={`absolute flex justify-center items-center w-full h-full bg-black/70 ${
        gameStatus === "gameOver" ? "block" : "hidden"
      }`}
    >
      {/* centered info modal */}
      <div className="flex justify-center items-center w-full h-1/2 max-w-[768px] p-4 bg-white rounded-md shadow-lg">
        <GameOverMessage />
      </div>
    </div>
  );
}

function GameOverMessage() {
  const gameWinner = useConnectFourStore((state) => state.gameWinner);

  if (gameWinner) {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <Image
          src={playerInfoMap[gameWinner].image}
          alt="Player profile image"
          height={100}
        />
        <h3
          className={`text-3xl font-semibold ${
            gameWinner === "red" ? "text-red-600" : "text-yellow-400"
          }`}
        >
          {playerInfoMap[gameWinner].name}{" "}
          <span className="text-black font-normal">wins!</span>
        </h3>
        <ResetButton />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <h3 className="text-3xl text-stone-600">Stalemate.</h3>
        <ResetButton />
      </div>
    );
  }
}

function ResetButton() {
  const reset = useConnectFourStore((state) => state.reset);

  return (
    <button
      onClick={() => reset()}
      className="border rounded-md px-3 py-2 shadow-sm"
    >
      Play again?
    </button>
  );
}
