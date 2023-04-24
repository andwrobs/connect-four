import React, { useRef, useEffect } from "react";
import { useConnectFourStore } from "@/stores/useConnectFourStore";
import { MakeMovesRow } from "./MakeMovesRow";

export function GameBoard() {
  const board = useConnectFourStore((state) => state.board);

  return (
    // board and decorations
    <div className="flex flex-col flex-grow max-w-[768px] w-full p-4">
      {/* - body */}
      <div className="flex flex-grow">
        {/* left board leg */}
        <BoardLeg />
        {/* board */}
        <div className="flex flex-col w-full">
          <MakeMovesRow />
          <div className="w-full flex-grow border-8 border-blue-900 bg-blue-700 grid grid-rows-6 grid-cols-7">
            {board.map((row) => {
              return row.map((slotValue, i) => {
                return (
                  <div className="flex justify-content items-center p-1">
                    <svg
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="50"
                        className={`${
                          slotValue === "red"
                            ? "fill-red-600"
                            : slotValue === "yellow"
                            ? "fill-yellow-400"
                            : "fill-white"
                        }`}
                      />
                    </svg>
                  </div>
                );
              });
            })}
          </div>
        </div>
        {/* right board leg */}
        <BoardLeg />
      </div>
      {/* - bottom frame */}
      <div className="flex h-4 bg-blue-900 w-full" />
      {/* - feet */}
      <div className="flex justify-between w-full">
        <TrapezoidBoardFootLeft />
        <TrapezoidBoardFootRight />
      </div>
    </div>
  );
}

function BoardLeg() {
  return (
    <div className="flex flex-col justify-end">
      <div className="h-2/5 w-6 bg-blue-900" />
    </div>
  );
}

function TrapezoidBoardFootRight() {
  return (
    <div
      className="h-8 w-8 bg-blue-900"
      style={{ clipPath: "polygon(0 0, 90% 0%, 100% 100%, 0% 100%)" }}
    />
  );
}

function TrapezoidBoardFootLeft() {
  return (
    <div
      className="h-8 w-8 bg-blue-900"
      style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)" }}
    />
  );
}
