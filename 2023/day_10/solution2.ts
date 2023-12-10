import {
  type Coordinates,
  type GridConnectorItem,
  type GridItem,
  mapping,
  ENTRY,
  PADDING,
  printGrid,
  getAdjacentItems,
  calcLoop,
  guessConnectorType,
} from "./common";

export const mapInput = (
  input: string[],
): {
  grid: (GridItem | GridConnectorItem)[][];
  startingGridItem: GridConnectorItem;
} => {
  // index offset between "actual" items (would be index + 1 in a normal grid)
  const offset = 2;
  const paddingItems = offset - 1;

  const gridValues = input.flatMap((line, i) => [
    ...(i === 0
      ? Array.from({ length: paddingItems }, () =>
          Array.from({ length: line.length * offset + 1 }, () => PADDING),
        )
      : []),
    line
      .split("")
      .flatMap((char, j) => [
        ...(j === 0 ? Array.from({ length: paddingItems }, () => PADDING) : []),
        mapping[char],
        ...Array.from({ length: paddingItems }, () => PADDING),
      ]),
    ...Array.from({ length: paddingItems }, () =>
      Array.from({ length: line.length * offset + 1 }, () => PADDING),
    ),
  ]);

  const paddedGrid = gridValues.map((row, rowIndex) =>
    row.map((value, colIndex) => ({
      row: rowIndex,
      col: colIndex,
      value,
    })),
  );

  const startingCoords = paddedGrid.flat().find((item) => item.value === ENTRY);

  if (!startingCoords) {
    throw new Error("No starting point found");
  }

  const type = guessConnectorType({ grid: paddedGrid, startingCoords, offset });

  if (!type) {
    throw new Error("Invalid starting connector");
  }

  const startingGridItem = {
    ...paddedGrid[startingCoords.row][startingCoords.col],
    value: type,
  };

  paddedGrid[startingCoords.row][startingCoords.col] = startingGridItem;

  const grid = paddedGrid.map((row) =>
    row.map((item) => {
      if (item.value === PADDING) {
        const connector = guessConnectorType({
          grid: paddedGrid,
          startingCoords: item,
          offset: 1,
        });

        return {
          ...item,
          wasPadding: true,
          value: connector ?? item.value,
        };
      }

      return item;
    }),
  );

  return {
    grid,
    startingGridItem,
  };
};

const buildValuesCoordSets = (grid: GridItem[][], values: Coordinates[]) => {
  const coordSets = new Map<number, Set<number>>(
    Array.from({ length: grid.length }, (_, i) => [i, new Set<number>()]),
  );

  for (const { row, col } of values) {
    coordSets.get(row)!.add(col);
  }

  return coordSets;
};

export const run2 = (input: string[], print = false): number => {
  const { grid, startingGridItem } = mapInput(input);
  const loop = calcLoop(grid, startingGridItem);

  const loopCoords = buildValuesCoordSets(grid, loop);
  const openCoords = buildValuesCoordSets(grid, []);

  let adjacent = [{ row: 0, col: 0 }];
  while (adjacent.length > 0) {
    const adjacentTemp = adjacent;
    adjacent = [];

    adjacentTemp.forEach(({ row, col }) => {
      Object.values(
        getAdjacentItems({
          grid,
          gridItem: { row, col },
          offset: 1,
        }),
      ).forEach((item) => {
        if (
          !item ||
          loopCoords.get(item.row)?.has(item.col) ||
          openCoords.get(item.row)?.has(item.col)
        ) {
          return;
        }

        openCoords.get(item.row)!.add(item.col);
        adjacent.push(item);
      });
    });
  }

  const enclosedCoordList = grid
    .flat()
    .filter(
      (item) =>
        !item.wasPadding &&
        !loopCoords.get(item.row)?.has(item.col) &&
        !openCoords.get(item.row)?.has(item.col),
    );

  if (print) {
    printGrid(grid, loop, enclosedCoordList);
  }

  return enclosedCoordList.length;
};
