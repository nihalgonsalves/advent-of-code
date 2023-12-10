import { getInputLines } from "../../getInputLines";

const [pos1, pos2] = (await getInputLines(import.meta.url)).map((l) =>
  parseInt(l.split("").at(-1)!, 10),
);

export type Universe = {
  positions: { 1: number; 2: number };
  scores: { 1: number; 2: number };
  player: 1 | 2;
};

export const startingUniverse: Universe = {
  positions: {
    1: pos1,
    2: pos2,
  },
  scores: {
    1: 0,
    2: 0,
  },
  player: 1,
};

export const getNextParams = (
  { positions, player }: Pick<Universe, "positions" | "player">,
  roll: number,
): Pick<Universe, "positions" | "player"> => {
  const newPositions = { ...positions };

  newPositions[player] = wrapAround(positions[player] + roll, 10);

  return {
    player: player === 1 ? 2 : 1,
    positions: newPositions,
  };
};

export const wrapAround = (i: number, n: number): number => {
  if (i <= n) {
    return i;
  } else {
    return i % n !== 0 ? i % n : n;
  }
};
