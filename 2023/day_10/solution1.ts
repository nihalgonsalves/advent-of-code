import {
  type Coordinates,
  type GridConnectorItem,
  type GridItem,
  mapping,
  isConnector,
  ENTRY,
  printGrid,
  calcLoop,
  guessConnectorType,
} from "./common";

export const mapInput = (
  input: string[]
): {
  grid: (GridItem | GridConnectorItem)[][];
  startingGridItem: GridConnectorItem;
} => {
  let startingCoords: Coordinates | undefined;

  const grid = input.map((line, row) =>
    line.split("").map((char, col): GridItem | GridConnectorItem => {
      const value = mapping[char];

      if (value === ENTRY) {
        startingCoords = { row, col };
      }

      if (isConnector(value)) {
        return { row, col, value };
      }

      return { row, col, value };
    })
  );

  if (!startingCoords) {
    throw new Error("No starting point found");
  }

  const type = guessConnectorType({ grid, startingCoords });

  if (!type) {
    throw new Error("Invalid starting connector");
  }

  const startingGridItem = {
    ...grid[startingCoords.row][startingCoords.col],
    value: type,
  };

  grid[startingCoords.row][startingCoords.col] = startingGridItem;

  return {
    grid,
    startingGridItem,
  };
};

export const run1 = (input: string[], print = false): number => {
  const { grid, startingGridItem } = mapInput(input);

  const loop = calcLoop(grid, startingGridItem);

  if (print) {
    printGrid(grid, loop, []);
  }

  // loop includes starting point twice
  return (loop.length - 1) / 2;
};
