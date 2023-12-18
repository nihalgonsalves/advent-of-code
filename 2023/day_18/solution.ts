type Direction = "U" | "D" | "L" | "R";

type DigInstruction = { direction: Direction; count: number };

enum Cell {
  INSIDE,
  OUTSIDE,
  BORDER,
}

const parseInput = (input: string[]) =>
  input.map((line) => {
    const [direction, count, color] = line.split(" ");

    return {
      direction: direction as Direction,
      count: parseInt(count, 10),
    };
  });

type Coords = [i: number, j: number];

const getNextCursors = (
  direction: Direction,
  count: number,
  [i, j]: Coords,
): Coords => {
  switch (direction) {
    case "U":
      return [i - count, j];
    case "D":
      return [i + count, j];
    case "L":
      return [i, j - count];
    case "R":
      return [i, j + count];
  }
};
const createInitialDig = (instructions: DigInstruction[]) => {
  let maxI = -Infinity;
  let maxJ = -Infinity;
  let minI = +Infinity;
  let minJ = +Infinity;

  let i = 0;
  let j = 0;

  for (const { direction, count } of instructions) {
    [i, j] = getNextCursors(direction, count, [i, j]);

    maxI = Math.max(maxI, i);
    maxJ = Math.max(maxJ, j);
    minI = Math.min(minI, i);
    minJ = Math.min(minJ, j);
  }

  // +1 to account for surrounding empty border
  const offsetI = -minI + 1;
  const offsetJ = -minJ + 1;

  // +2 to account for surrounding empty border
  const height = maxI - minI + 1 + 2;
  const width = maxJ - minJ + 1 + 2;

  const matrix = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => Cell.INSIDE),
  );

  for (const { direction, count } of instructions) {
    for (let k = 0; k < count; k++) {
      [i, j] = getNextCursors(direction, 1, [i, j]);

      matrix[i + offsetI][j + offsetJ] = Cell.BORDER;
    }
  }

  return matrix;
};

const neighbours = ([i, j]: Coords): Coords[] => [
  [i - 1, j],
  [i + 1, j],
  [i, j - 1],
  [i, j + 1],
];

const floodFillOutside = (matrix: number[][]) => {
  const cursors: Coords[] = [[0, 0]];

  while (cursors.length > 0) {
    const [i, j] = cursors.pop()!;

    if (matrix[i]?.[j] === Cell.INSIDE) {
      matrix[i][j] = Cell.OUTSIDE;

      cursors.push(...neighbours([i, j]));
    }
  }
};
export const run1 = (input: string[]): number => {
  const instructions = parseInput(input);

  const matrix = createInitialDig(instructions);

  floodFillOutside(matrix);

  return matrix
    .flat()
    .reduce((acc, cell) => (cell !== Cell.OUTSIDE ? acc + 1 : acc), 0);
};

export const run2 = (input: string[]): number => {
  return 0;
};
