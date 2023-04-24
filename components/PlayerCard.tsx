import Image from "next/image";
import { Player, playerInfoMap } from "@/types";
import { PlayerTurnIndicator } from "./PlayerTurnIndicator";

type PlayerCardPosition = "left" | "right";

type PlayerCardProps = {
  player: Player;
  position: PlayerCardPosition;
};

export function PlayerCard({ player, position }: PlayerCardProps) {
  return (
    <div className="flex items-center">
      {/* image and turn arrow */}
      <div
        className={`flex flex-col p-1 ${
          position === "left" ? "order-1" : "order-2"
        }`}
      >
        {/* turn arrow */}
        <div
          className={`flex w-full p-1 ${
            position === "left" ? "justify-start" : "justify-end"
          }`}
        >
          <PlayerTurnIndicator player={player} />
        </div>
        {/* image */}
        <Image
          src={playerInfoMap[player].image}
          alt="Player profile image"
          height={100}
        />
      </div>
      {/* name */}
      <div className={`${position === "left" ? "order-2" : "order-1"}`}>
        <span className={`text-2xl font-bold`}>
          {playerInfoMap[player].name}
        </span>
      </div>
    </div>
  );
}
