declare var self: Worker;

export type Input = {
  matrix: Cell[][];
  startingCursor: Cursor;
};

export type Output = Cell[][];

self.onmessage = (event: MessageEvent<Input>) => {
  const { matrix, startingCursor } = event.data;

  postMessage(traverse(matrix, startingCursor) satisfies Output);
};

const EMPTY = "." as const;

export type Cell = {
  i: number;
  j: number;
  value: string;
  energizedCount: number;
};

export type Direction = "north" | "east" | "south" | "west";

export type Coord = { i: number; j: number };

export type Cursor = Coord & { direction: Direction };

const nextPosition = ({ i, j, direction }: Cursor): Coord => {
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

const traverse = (matrix: Cell[][], startingCursor: Cursor): Cell[][] => {
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

  return matrix;
};
