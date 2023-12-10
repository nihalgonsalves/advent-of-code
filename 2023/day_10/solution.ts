import chalk from "chalk";

export enum Connector {
  "┃" = "┃",
  "━" = "━",
  "┗" = "┗",
  "┛" = "┛",
  "┓" = "┓",
  "┏" = "┏",
}

export const EMPTY = "." as const;
export const ENTRY = "╳" as const;

type GridValue = Connector | typeof EMPTY | typeof ENTRY;

type Coordinates = { row: number; col: number };
type GridItem = Coordinates & { value: GridValue };

const DIRECTIONS = ["north", "east", "south", "west"] as const;
type Direction = (typeof DIRECTIONS)[number];

const isConnector = (value: GridValue): value is Connector =>
  Connector[value as Connector] !== undefined;

const opposingDirection: Record<Direction, Direction> = {
  north: "south",
  east: "west",
  south: "north",
  west: "east",
};

const connectorTypes: Record<Connector, Set<Direction>> = {
  [Connector["┃"]]: new Set(["north", "south"]),
  [Connector["━"]]: new Set(["east", "west"]),
  [Connector["┗"]]: new Set(["north", "east"]),
  [Connector["┛"]]: new Set(["north", "west"]),
  [Connector["┓"]]: new Set(["south", "west"]),
  [Connector["┏"]]: new Set(["south", "east"]),
};

const mapping: Record<string, GridValue> = {
  "|": Connector["┃"],
  "-": Connector["━"],
  L: Connector["┗"],
  J: Connector["┛"],
  "7": Connector["┓"],
  F: Connector["┏"],
  ".": EMPTY,
  S: ENTRY,
};

type GridConnectorItem = GridItem & {
  value: Connector;
  directions: Set<Direction>;
};

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
        return { row, col, value, directions: connectorTypes[value] };
      }

      return { row, col, value };
    })
  );

  if (!startingCoords) {
    throw new Error("No starting point found");
  }

  const type = guessStartingConnectorType(grid, startingCoords);

  const startingGridItem = {
    ...grid[startingCoords.row][startingCoords.col],
    value: type,
    directions: connectorTypes[type],
  };

  grid[startingCoords.row][startingCoords.col] = startingGridItem;

  return {
    grid,
    startingGridItem,
  };
};

export const printGrid = (grid: GridItem[][], seen: Coordinates[]) => {
  console.log(
    grid
      .map((row, rowIndex) =>
        row
          .map((item, colIndex) =>
            seen.find((v) => v.row === rowIndex && v.col === colIndex)
              ? chalk.red(item.value)
              : item.value
          )
          .join("")
      )
      .join("\n")
  );
};

export const getAdjacentItems = (
  input: GridItem[][],
  { row, col }: Coordinates
): Record<Direction, GridItem | undefined> => ({
  north: input[row - 1]?.[col],
  east: input[row]?.[col + 1],
  south: input[row + 1]?.[col],
  west: input[row]?.[col - 1],
});

export const guessStartingConnectorType = (
  input: GridItem[][],
  startingPoint: Coordinates
): Connector => {
  const adjacentItems = getAdjacentItems(input, startingPoint);

  const isConnected = (
    value: GridValue | undefined,
    possiblyConnectedDirection: Direction
  ) => {
    if (!value || !isConnector(value)) {
      return false;
    }

    return connectorTypes[value].has(
      opposingDirection[possiblyConnectedDirection]
    );
  };

  const [north, east, south, west] = DIRECTIONS.map((direction) =>
    isConnected(adjacentItems[direction]?.value, direction)
  );

  if (north && east) {
    return Connector["┗"];
  }

  if (east && south) {
    return Connector["┏"];
  }

  if (south && west) {
    return Connector["┓"];
  }

  if (west && north) {
    return Connector["┛"];
  }

  throw new Error("Invalid starting connector");
};

export const run1 = (input: string[]): number => {
  const { grid, startingGridItem } = mapInput(input);

  // can start in direction
  let enteredFrom = [...startingGridItem.directions.values()][0];
  let cursor: GridConnectorItem = startingGridItem;
  let steps = 0;

  // const seen: Coordinates[] = [cursor];

  do {
    steps++;

    enteredFrom = [...cursor.directions].find(
      (dir) => dir !== opposingDirection[enteredFrom]
    )!;

    cursor = getAdjacentItems(grid, cursor)[enteredFrom] as GridConnectorItem;

    // seen.push(cursor);
  } while (
    !(cursor.row == startingGridItem.row && cursor.col == startingGridItem.col)
  );

  // printGrid(grid, seen);

  return steps / 2;
};

export const run2 = (input: string[]): number => {
  return 0;
};
