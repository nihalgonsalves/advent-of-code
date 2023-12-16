const EMPTY = "." as const;

type Cell = { i: number; j: number; value: string; energized: boolean };

const parseInput = (input: string[]): Cell[][] =>
  input.map((line, i) =>
    line.split("").map((char, j) => ({
      i,
      j,
      value: char,
      energized: false,
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

const traverse = (matrix: Cell[][]): void => {
  matrix[0][0].energized = true;

  const cursors: Cursor[] = [{ i: 0, j: -1, direction: "east" }];
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

    matrix[i][j].energized = true;
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

  traverse(matrix);

  return matrix
    .flat()
    .reduce((acc, cell) => (cell.energized ? acc + 1 : acc), 0);
};

export const run2 = (input: string[]): number => {
  return 0;
};
