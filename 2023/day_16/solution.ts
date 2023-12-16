import * as R from "ramda";

const EMPTY = "." as const;

type Cell = { i: number; j: number; value: string; energizedCount: number };

const parseInput = (input: string[]): Cell[][] =>
  input.map((line, i) =>
    line.split("").map((char, j) => ({
      i,
      j,
      value: char,
      energizedCount: 0,
    })),
  );

type Direction = "north" | "east" | "south" | "west";

type Position = { i: number; j: number };

type Cursor = Position & { direction: Direction };

const nextPosition = ({ i, j, direction }: Cursor): Position => {
  switch (direction) {
    case "north":
      return { i: i - 1, j };
    case "east":
      return { i, j: j + 1 };
    case "south":
      return { i: i + 1, j };
    case "west":
      return { i, j: j - 1 };
  }
};

const directionMap = {
  "\\": {
    north: "west",
    east: "south",
    south: "east",
    west: "north",
  },
  "/": {
    north: "east",
    east: "north",
    south: "west",
    west: "south",
  },
} as const satisfies Record<string, Record<Direction, Direction>>;

const traverse = (matrix: Cell[][], startingCursor: Cursor): void => {
  const cursors: Cursor[] = [startingCursor];
  const seen = new Set<string>();

  while (cursors.length) {
    const cursor = cursors.pop()!;

    const key = JSON.stringify(cursor);
    if (seen.has(key)) {
      continue;
    } else {
      seen.add(key);
    }

    const { direction } = cursor;
    const { i, j } = nextPosition(cursor);

    if (matrix[i]?.[j] === undefined) {
      continue;
    }

    matrix[i][j].energizedCount++;
    const { value } = matrix[i][j];

    if (value === EMPTY) {
      cursors.push({ direction, i, j });
    } else if (value === "\\" || value === "/") {
      cursors.push({ direction: directionMap[value][direction], i, j });
    } else if (value === "-") {
      if (direction === "east" || direction === "west") {
        cursors.push({ direction, i, j });
      } else {
        cursors.push(
          // break
          { direction: "east", i, j },
          { direction: "west", i, j },
        );
      }
    } else if (value === "|") {
      if (direction === "north" || direction === "south") {
        cursors.push({ direction, i, j });
      } else {
        cursors.push(
          { direction: "north", i, j },
          { direction: "south", i, j },
        );
      }
    }
  }
};

export const run1 = (input: string[]): number => {
  const matrix = parseInput(input);

  traverse(matrix, { i: 0, j: -1, direction: "east" });

  return matrix
    .flat()
    .reduce((acc, cell) => (cell.energizedCount > 0 ? acc + 1 : acc), 0);
};

export const run2 = (input: string[]): number => {
  const inputMatrix = parseInput(input);

  const cursors: Cursor[] = [
    // top
    ...Array.from({ length: inputMatrix[0].length }, (_, j) => ({
      i: -1,
      j,
      direction: "south" as const,
    })),
    // bottom
    ...Array.from({ length: inputMatrix[0].length }, (_, j) => ({
      i: inputMatrix.length,
      j,
      direction: "north" as const,
    })),
    // left
    ...Array.from({ length: inputMatrix.length }, (_, i) => ({
      i,
      j: -1,
      direction: "east" as const,
    })),
    // right
    ...Array.from({ length: inputMatrix.length }, (_, i) => ({
      i,
      j: inputMatrix[0].length,
      direction: "west" as const,
    })),
  ];

  const results = cursors.map((cursor, i) => {
    const matrix = R.clone(inputMatrix);

    traverse(matrix, cursor);

    return {
      matrix,
      cursor,
      energizedCells: matrix
        .flat()
        .reduce((acc, cell) => (cell.energizedCount > 0 ? acc + 1 : acc), 0),
    };
  });

  const largest = results.sort(
    (a, b) => b.energizedCells - a.energizedCells,
  )[0];

  return largest.energizedCells;
};
