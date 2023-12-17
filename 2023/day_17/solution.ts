import FastPriorityQueue from "fastpriorityqueue";

type Cell = { i: number; j: number; cost: number };

const parseInput = (input: string[]): Cell[][] =>
  input.map((line, i) =>
    line.split("").map((char, j) => ({ i, j, cost: parseInt(char, 10) })),
  );

type Direction = "north" | "east" | "south" | "west";

type Cursor = Cell & {
  direction: Direction;
  forwardMovementCount: number;
};

const makeCursor = (
  currentCost: number,
  cell: Cell | undefined,
  direction: Direction,
  forwardMovementCount = 0,
): Cursor | undefined =>
  cell
    ? {
        ...cell,
        cost: currentCost + cell.cost,
        direction,
        forwardMovementCount,
      }
    : undefined;

const getLeftRightNeighbours = (
  { direction, i, j, cost }: Cursor,
  matrix: Cell[][],
): (Cursor | undefined)[] => {
  switch (direction) {
    case "north":
    case "south":
      return [
        makeCursor(cost, matrix[i]?.[j - 1], "west"),
        makeCursor(cost, matrix[i]?.[j + 1], "east"),
      ];
    case "east":
    case "west":
      return [
        makeCursor(cost, matrix[i - 1]?.[j], "north"),
        makeCursor(cost, matrix[i + 1]?.[j], "south"),
      ];
  }
};

const getForwardCursor = (
  { direction, i, j, forwardMovementCount, cost }: Cursor,
  matrix: Cell[][],
): Cursor | undefined => {
  switch (direction) {
    case "north":
      return makeCursor(
        cost,
        matrix[i - 1]?.[j],
        direction,
        forwardMovementCount + 1,
      );
    case "east":
      return makeCursor(
        cost,
        matrix[i]?.[j + 1],
        direction,
        forwardMovementCount + 1,
      );
    case "south":
      return makeCursor(
        cost,
        matrix[i + 1]?.[j],
        direction,
        forwardMovementCount + 1,
      );
    case "west":
      return makeCursor(
        cost,
        matrix[i]?.[j - 1],
        direction,
        forwardMovementCount + 1,
      );
  }
};

const neighbours = (cursor: Cursor, matrix: Cell[][]): Cursor[] => {
  const leftRightNeighbours = getLeftRightNeighbours(cursor, matrix);

  const forwardNeighbour =
    cursor.forwardMovementCount < 2
      ? getForwardCursor(cursor, matrix)
      : undefined;

  return [forwardNeighbour, ...leftRightNeighbours].filter(
    (c): c is NonNullable<typeof c> => c !== undefined,
  );
};

export const run1 = (input: string[]): number => {
  const matrix = parseInput(input);

  const start: Cursor = {
    ...matrix[0][0],
    direction: "east",
    forwardMovementCount: 0,
    cost: 0,
  };

  const goalI = matrix.length - 1;
  const goalJ = matrix[0].length - 1;

  const openSet = new FastPriorityQueue<Cursor>((a, b) => a.cost < b.cost);
  openSet.add(start);

  const cursorKey = ({ i, j, direction, forwardMovementCount }: Cursor) =>
    JSON.stringify({ i, j, direction, forwardMovementCount });

  const gScore = new Map<string, number>();
  gScore.set(cursorKey(start), start.cost);

  while (!openSet.isEmpty()) {
    const current = openSet.poll()!;

    if (current.i === goalI && current.j === goalJ) {
      return current.cost;
    }

    for (const next of neighbours(current, matrix)) {
      const tentativeGScore =
        (gScore.get(cursorKey(current)) ?? Infinity) + next.cost;
      if (tentativeGScore < (gScore.get(cursorKey(next)) ?? Infinity)) {
        gScore.set(cursorKey(next), tentativeGScore);
        openSet.add(next);
      }
    }
  }

  throw new Error("No path found");
};

export const run2 = (input: string[]): number => {
  return 0;
};
