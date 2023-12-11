import * as R from "ramda";

const GALAXY = "#" as const;
// const EMPTY = "." as const;

type GridItem = { type: "galaxy" | "empty" };

type GridItemWithCoords = GridItem & { row: number; col: number };

const pairs = <T>(items: T[]) => {
  return items.flatMap((item, i) =>
    items.slice(i + 1).map((otherItem) => [item, otherItem] as const),
  );
};

const mapInput = (input: string[]) => {
  const galaxies: GridItemWithCoords[] = [];

  const originalGrid = input.map((line, rowIndex) =>
    line.split("").map((char, colIndex): GridItemWithCoords => {
      const base = { row: rowIndex, col: colIndex };
      if (char === GALAXY) {
        galaxies.push({ ...base, type: "galaxy" });
        return { ...base, type: "galaxy" };
      }

      return { ...base, type: "empty" };
    }),
  );

  const emptyRowIndexes = new Set(
    originalGrid
      .filter((row) => row.every((item) => item.type === "empty"))
      .map((items) => items[0].row),
  );

  const emptyColIndexes = new Set(
    R.transpose(originalGrid)
      .filter((row) => row.every((item) => item.type === "empty"))
      .map((items) => items[0].col),
  );

  return { pairs: pairs(galaxies), emptyRowIndexes, emptyColIndexes };
};

export const run = (input: string[], scalingFactor = 2): number => {
  const { pairs, emptyRowIndexes, emptyColIndexes } = mapInput(input);

  return pairs.reduce((acc, [galA, galB]) => {
    const [rowA, rowB] = [galA.row, galB.row].sort((a, b) => a - b);
    const [colA, colB] = [galA.col, galB.col].sort((a, b) => a - b);

    const verticalSteps = R.range(rowA, rowB).reduce(
      (sum, row) => sum + (emptyRowIndexes.has(row) ? scalingFactor : 1),
      0,
    );

    const horizontalSteps = R.range(colA, colB).reduce(
      (sum, col) => sum + (emptyColIndexes.has(col) ? scalingFactor : 1),
      0,
    );

    return acc + verticalSteps + horizontalSteps;
  }, 0);
};
