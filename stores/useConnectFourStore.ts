import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  boardConfig,
  BoardSlotState,
  Move,
  Player,
  SequenceDirection,
} from "@/types";

type State = {
  board: BoardSlotState[][];
  currentTurn: Player;
  gameStatus: "playing" | "gameOver";
  gameWinner: Player | null;
};

type Actions = {
  checkMove: (column: number) => boolean;
  playMove: (column: number) => void;
  reset: () => void;
};

export const useConnectFourStore = create(
  immer<State & Actions>((set, get) => ({
    /**
     * state
     */

    board: makeNewBoard(),

    currentTurn: "red",

    gameStatus: "playing",

    gameWinner: null,

    /**
     * actions
     */

    checkMove: (columnNumber: number) => {
      const currentBoard = get().board;
      const move = getNextAvailableSlot(columnNumber, currentBoard);

      if (move) {
        return true;
      } else {
        return false;
      }
    },

    playMove: (columnNumber: number) => {
      const currentBoard = get().board;
      const currentPlayer = get().currentTurn;
      const move = getNextAvailableSlot(columnNumber, currentBoard);

      if (move) {
        // if there is a move available
        set((state) => {
          // update board and currentTurn
          state.board[move.row][move.column] = currentPlayer;
          state.currentTurn = togglePlayer(currentPlayer);
          // if the move caused the player to win, update the game status
          const gameWinner = checkForWin(state.board);
          if (gameWinner) {
            state.gameStatus = "gameOver";
            state.gameWinner = gameWinner;
          }
          // if there are no moves left, update the game status
          const isStalemate = checkForStalemate(state.board[0]);
          if (isStalemate) {
            state.gameStatus = "gameOver";
          }
        });
      }
    },

    reset: () =>
      set((state) => {
        state.board = makeNewBoard();
        state.currentTurn = "red";
        state.gameStatus = "playing";
        state.gameWinner = null;
      }),
  }))
);

// +-+-+ game logic +-+-+

function makeNewBoard(): BoardSlotState[][] {
  // board config
  const rows = 6;
  const columns = 7;

  // fill board with empty BoardSlotStates
  const board: BoardSlotState[][] = [];
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i][j] = "empty";
    }
  }

  return board;
}

const winnableDirections: SequenceDirection[] = [
  { dColumn: 1, dRow: 0 }, // right
  { dColumn: 0, dRow: 1 }, // down
  { dColumn: 1, dRow: 1 }, // diagonal down-right
  { dColumn: 1, dRow: -1 }, // diagonal up-right
  /**
   * Left, Up, Up-left, Down-left directions are not needed
   * because checkForWin iterates over the entire board.
   */
];

function checkForWin(board: BoardSlotState[][]): Player | null {
  /**
   * Returns true if there's a winning sequence starting at the provided board coords.
   */
  function checkDirection(
    row: number,
    column: number,
    direction: SequenceDirection
  ): boolean {
    // grab current board slot and direction
    const startingBoardSlot = board[row][column];
    const { dRow, dColumn } = direction;
    // if slot is empty, no winning sequences start from this slot
    if (startingBoardSlot === "empty") return false;
    // check provided direction, exiting if out of bounds or broken sequence
    for (let i = 1; i < boardConfig.winningSequenceCount; i++) {
      const newRow = row + i * dRow;
      const newColumn = column + i * dColumn;
      if (
        !isInsideBoard(newRow, newColumn) ||
        board[newRow][newColumn] !== startingBoardSlot
      ) {
        return false;
      }
    }
    // if sequence wasn't broken for winningSequenceCount, there is a winning sequence
    return true;
  }

  // for each board slot
  for (let row = 0; row < boardConfig.rowCount; row++) {
    for (let column = 0; column < boardConfig.columnCount; column++) {
      // check all winnableDirections
      for (let d = 0; d < winnableDirections.length; d++) {
        if (checkDirection(row, column, winnableDirections[d])) {
          return board[row][column] as Player; // checkDirection guards against "empty" slot
        }
      }
    }
  }

  return null;
}

function checkForStalemate(column: BoardSlotState[]): boolean {
  if (column.includes("empty")) {
    return false;
  } else {
    return true;
  }
}

function getNextAvailableSlot(
  column: number,
  board: BoardSlotState[][]
): Move | null {
  // check from bottom row up
  for (let row = boardConfig.rowCount - 1; row >= 0; row--) {
    // return on first found empty slot in row
    if (board[row][column] === "empty") {
      return {
        row,
        column,
      };
    }
  }
  // else if no empty slot found, no available moves
  return null;
}

function isInsideBoard(row: number, column: number) {
  return (
    row >= 0 &&
    row < boardConfig.rowCount &&
    column >= 0 &&
    column < boardConfig.columnCount
  );
}

function togglePlayer(player: Player): Player {
  if (player === "red") {
    return "yellow";
  } else {
    return "red";
  }
}
