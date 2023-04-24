import { StaticImageData } from "next/image";
import RED_PLAYER_IMAGE from "@/assets/red-player.webp";
import YELLOW_PLAYER_IMAGE from "@/assets/yellow-player.webp";

// types

export type BoardSlotState = "empty" | Player;

export type BoardConfig = {
  rowCount: number;
  columnCount: number;
  winningSequenceCount: 4;
};

export type GameStatus = "playing" | "stalemate";

export type Move = {
  row: number;
  column: number;
};

export type Player = "red" | "yellow";

export type PlayerInfo = {
  name: string;
  image: StaticImageData;
};

export type SequenceDirection = {
  dRow: number;
  dColumn: number;
};

// config

export const boardConfig: BoardConfig = {
  rowCount: 6,
  columnCount: 7,
  winningSequenceCount: 4,
};

export const playerInfoMap: Record<Player, PlayerInfo> = {
  red: {
    name: "Red",
    image: RED_PLAYER_IMAGE,
  },
  yellow: {
    name: "Yellow",
    image: YELLOW_PLAYER_IMAGE,
  },
};
