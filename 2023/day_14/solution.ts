const toMatrix = (input: string[]) => input.map((line) => line.split(""));

type Direction = "north" | "west" | "south" | "east";

const getInitialCursor = (i: number, j: number, direction: string) => {
  switch (direction) {
    case "north":
    case "south":
      return i;

    case "east":
    case "west":
      return j;
  }

  throw new Error("Invalid direction");
};

const getNextCursor = (cursor: number, direction: string) => {
  switch (direction) {
    case "north":
    case "west":
      return cursor - 1;

    case "east":
    case "south":
      return cursor + 1;
  }

  throw new Error("Invalid direction");
};

const canMove = (
  matrix: string[][],
  cursor: number,
  i: number,
  j: number,
  direction: string,
) => {
  switch (direction) {
    case "north":
    case "south":
      return matrix[getNextCursor(cursor, direction)]?.[j] === ".";

    case "east":
    case "west":
      return matrix[i]?.[getNextCursor(cursor, direction)] === ".";
  }

  throw new Error("Invalid direction");
};

const moveRocks = (
  matrix: string[][],
  cursor: number,
  i: number,
  j: number,
  direction: string,
) => {
  switch (direction) {
    case "north":
    case "south":
      matrix[getNextCursor(cursor, direction)][j] = "O";
      matrix[cursor][j] = ".";
      return;

    case "east":
    case "west":
      matrix[i][getNextCursor(cursor, direction)] = "O";
      matrix[i][cursor] = ".";
      return;
  }

  throw new Error("Invalid direction");
};

const cycleMatrix = (matrix: string[][], direction: Direction) => {
  const iterate = (i: number, j: number) => {
    if (matrix[i][j] !== "O") {
      return;
    }

    let cursor = getInitialCursor(i, j, direction);

    while (canMove(matrix, cursor, i, j, direction)) {
      moveRocks(matrix, cursor, i, j, direction);

      cursor = getNextCursor(cursor, direction);
    }
  };

  if (direction === "north" || direction === "west") {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        iterate(i, j);
      }
    }
  } else if (direction === "south" || direction === "east") {
    for (let i = matrix.length - 1; 0 <= i; i--) {
      for (let j = matrix[i].length - 1; 0 <= j; j--) {
        iterate(i, j);
      }
    }
  }
};

const calcNorthLoad = (matrix: string[][]) =>
  matrix.reduce(
    (acc, line, index) =>
      acc +
      (matrix.length - index) * line.filter((char) => char === "O").length,
    0,
  );

export const run1 = (input: string[]): number => {
  const matrix = toMatrix(input);
  cycleMatrix(matrix, "north");
  return calcNorthLoad(matrix);
};

const cache = new Map<string, number>();

export const run2 = (input: string[]): number => {
  const matrix = toMatrix(input);

  for (let i = 0; i < 1_000_000_000; i++) {
    for (const direction of ["north", "west", "south", "east"] as const) {
      cycleMatrix(matrix, direction);
    }

    const key = JSON.stringify(matrix);
    const lastSeenAt = cache.get(key);
    if (lastSeenAt !== undefined) {
      const cycleLength = i - lastSeenAt;
      const remainingIndices = 1_000_000_000 - i;

      i += remainingIndices - (remainingIndices % cycleLength);
    } else {
      cache.set(key, i);
    }
  }

  return calcNorthLoad(matrix);
};
