import chalk from "chalk";

const CONNECTORS = ["┃", "━", "┗", "┛", "┓", "┏"] as const;
export type Connector = (typeof CONNECTORS)[number];

export const EMPTY = "." as const;
export const ENTRY = "╳" as const;
export const PADDING = "*" as const;

export type Coordinates = { row: number; col: number };
export type GridItem = Coordinates & { value: GridValue };

export type GridValue =
  | Connector
  | typeof EMPTY
  | typeof ENTRY
  | typeof PADDING;

export const DIRECTIONS = ["north", "east", "south", "west"] as const;
export type Direction = (typeof DIRECTIONS)[number];

export const opposingDirection: Record<Direction, Direction> = {
  north: "south",
  east: "west",
  south: "north",
  west: "east",
};

const direction = (directions: Set<Direction>) => ({
  north: directions.has("north"),
  east: directions.has("east"),
  south: directions.has("south"),
  west: directions.has("west"),

  directions: [...directions.values()],
});

const connectorTypes: Record<
  Connector,
  Record<Direction, boolean> & { directions: Direction[] }
> = {
  "┃": direction(new Set(["north", "south"])),
  "━": direction(new Set(["east", "west"])),
  "┗": direction(new Set(["north", "east"])),
  "┛": direction(new Set(["north", "west"])),
  "┓": direction(new Set(["south", "west"])),
  "┏": direction(new Set(["east", "south"])),
};

export const mapping: Record<string, GridValue> = {
  "|": "┃",
  "-": "━",
  L: "┗",
  J: "┛",
  "7": "┓",
  F: "┏",
  ".": EMPTY,
  S: ENTRY,
};

export type GridConnectorItem = GridItem & {
  value: Connector;
};

export const isConnector = <T = never>(
  value: T | Connector
): value is Connector => CONNECTORS.includes(value as unknown as any);

export const isConnected = (
  value: GridValue | undefined,
  possiblyConnectedDirection: Direction
) => {
  if (!value || !isConnector(value)) {
    return false;
  }

  return connectorTypes[value][opposingDirection[possiblyConnectedDirection]];
};

export const getAdjacentItems = ({
  grid,
  gridItem: { row, col },
  offset = 1,
}: {
  grid: GridItem[][];
  gridItem: Coordinates;
  offset?: number;
}): Record<Direction, GridItem | undefined> => ({
  north: grid[row - offset]?.[col],
  east: grid[row]?.[col + offset],
  south: grid[row + offset]?.[col],
  west: grid[row]?.[col - offset],
});

export const guessConnectorType = ({
  grid,
  startingCoords,
  offset = 1,
}: {
  grid: GridItem[][];
  startingCoords: Coordinates;
  offset?: number;
}): Connector | undefined => {
  const adjacentItems = getAdjacentItems({
    grid,
    gridItem: startingCoords,
    offset,
  });

  const [north, east, south, west] = DIRECTIONS.map((direction) =>
    isConnected(adjacentItems[direction]?.value, direction)
  );

  const found = Object.entries(connectorTypes).find(([, directions]) => {
    return (
      north === directions.north &&
      east === directions.east &&
      south === directions.south &&
      west === directions.west
    );
  });

  return found?.[0] as Connector | undefined;
};

export const calcLoop = (
  grid: GridItem[][],
  startingGridItem: GridConnectorItem
) => {
  // can start in direction
  let enteredFrom = connectorTypes[startingGridItem.value].directions[0];

  const seen: GridConnectorItem[] = [startingGridItem];

  do {
    const cursor = seen.at(-1)!;

    enteredFrom = connectorTypes[cursor.value].directions.find(
      (dir) => dir !== opposingDirection[enteredFrom]
    )!;

    seen.push(
      getAdjacentItems({ grid, gridItem: cursor })[
        enteredFrom
      ] as GridConnectorItem
    );
  } while (
    !(
      seen.at(-1)!.row == startingGridItem.row &&
      seen.at(-1)!.col == startingGridItem.col
    )
  );

  return seen;
};

export const tupleGridToGrid = (grid: GridValue[][]) =>
  grid.map((row, rowIndex) =>
    row.map((value, colIndex) => ({ row: rowIndex, col: colIndex, value }))
  );

export const printGrid = (
  grid: GridItem[][],
  seen: Coordinates[],
  highlighted: Coordinates[]
) => {
  const unconnected: Record<GridValue, string> = {
    "┃": "║",
    "━": "═",
    "┗": "╚",
    "┛": "╝",
    "┓": "╗",
    "┏": "╔",
    ".": "•",
    "╳": "╳",
    "*": "*",
  };

  console.log(
    grid
      .map((row, rowIndex) =>
        row
          .map((item, colIndex) => {
            const isHighlighted = highlighted.find(
              (v) => v.row === rowIndex && v.col === colIndex
            );

            const value = seen.find(
              (v) => v.row === rowIndex && v.col === colIndex
            )
              ? chalk.red(item.value as Connector)
              : unconnected[item.value];

            return isHighlighted ? chalk.bgGreen(value) : value;
          })
          .join("")
      )
      .join("\n")
  );
};
