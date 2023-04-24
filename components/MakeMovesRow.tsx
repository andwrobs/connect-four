import { useConnectFourStore } from "@/stores/useConnectFourStore";

export function MakeMovesRow() {
  return (
    <div className="w-full h-[4rem] grid grid-cols-7">
      {[...Array(7)].map((_, i) => (
        <MoveCircle columnNumber={i} />
      ))}
    </div>
  );
}

type MoveCircleProps = {
  columnNumber: number;
};

function MoveCircle({ columnNumber }: MoveCircleProps) {
  const currentTurn = useConnectFourStore((state) => state.currentTurn);
  const gameStatus = useConnectFourStore((state) => state.gameStatus);
  const checkMove = useConnectFourStore((state) => state.checkMove);
  const playMove = useConnectFourStore((state) => state.playMove);

  const isGameOver = gameStatus === "gameOver";
  const isDisabled = !checkMove(columnNumber) || isGameOver;

  return (
    <button
      disabled={isDisabled}
      onClick={() => {
        playMove(columnNumber);
      }}
      className={`flex justify-center items-center relative group ${
        isDisabled ? "cursor-not-allowed" : ""
      }`}
    >
      {/* - plus circle */}
      <div className="flex justify-center items-center w-6 h-6 rounded-full bg-stone-200 text-stone-400 opacity-50">
        +
      </div>
      {/* - move preview disc */}
      <div
        className={`absolute hidden rounded-full h-12 w-12 ${
          currentTurn === "red" && !isDisabled
            ? "bg-red-200/60 border-2 border-red-400"
            : currentTurn === "yellow" && !isDisabled
            ? "bg-yellow-200/60 border-2 border-yellow-400"
            : ""
        } ${!isDisabled ? "group-hover:block group-focus:block" : ""}`}
      />
    </button>
  );
}
