import assert from "assert";

import R from "ramda";
import { getInputLines } from "../getInputLines";

const input = getInputLines("04").filter((line) => line != "");

const [rawCalls, ...rawBoards] = input;

const calls = rawCalls.split(",").map((s) => parseInt(s, 10));

type BoardRow = [number, number, number, number, number];
type Board = [BoardRow, BoardRow, BoardRow, BoardRow, BoardRow];

const boards = R.pipe(
  () => rawBoards,
  R.map((boardLine) =>
    boardLine
      .split(" ")
      .filter((s) => s !== "")
      .map((s) => parseInt(s, 10))
  ),
  R.splitEvery(5)
)() as Board[];

const boardHitCount = Array.from({ length: boards.length }, () => ({
  won: false,
  row: Array.from({ length: 5 }, () => 0),
  column: Array.from({ length: 5 }, () => 0),
}));

type Win = { call: number; board: Board };

let firstWin: Win | undefined = undefined;
let lastWin: Win | undefined = undefined;

for (const call of calls) {
  boardLoop: for (
    let boardIndex = 0;
    boardIndex < boards.length;
    boardIndex++
  ) {
    if (boardHitCount[boardIndex].won) {
      continue;
    }

    for (let rowIndex = 0; rowIndex < boards[boardIndex].length; rowIndex++) {
      for (
        let colIndex = 0;
        colIndex < boards[boardIndex][rowIndex].length;
        colIndex++
      ) {
        if (boards[boardIndex][rowIndex][colIndex] === call) {
          // replace with -1 for final calculation
          boards[boardIndex][rowIndex][colIndex] = -1;

          boardHitCount[boardIndex].row[rowIndex] += 1;
          boardHitCount[boardIndex].column[colIndex] += 1;

          if (
            boardHitCount[boardIndex].row[rowIndex] === 5 ||
            boardHitCount[boardIndex].column[colIndex] === 5
          ) {
            boardHitCount[boardIndex].won = true;

            firstWin ??= { call, board: boards[boardIndex] };
            lastWin = { call, board: boards[boardIndex] };

            continue boardLoop;
          }
        }
      }
    }
  }
}

if (!firstWin || !lastWin) {
  throw new Error("No winning board");
}

const [firstResult, lastResult] = [firstWin, lastWin].map(
  ({ call, board }: Win) => {
    const sum = R.sum(board.flat().filter((n) => n !== -1));

    return {
      call,
      board,
      sum,
      total: sum * call,
    };
  }
);

assert.strictEqual(firstResult.total, 28082);
assert.strictEqual(lastResult.total, 8224);

console.log({ firstResult, lastResult });
