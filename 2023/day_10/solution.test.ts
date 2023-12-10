import { describe, it, expect, test } from "bun:test";

import {
  Connector,
  EMPTY,
  getAdjacentItems,
  guessStartingConnectorType,
  mapInput,
  run1,
  run2,
} from "./solution";
import { getInputLines } from "../../getInputLines";

const input = await getInputLines(import.meta.url);

describe("day 10", () => {
  const smallInput = [
    //           0 1 2
    "S-7", // 0  ╳ ━ ┓
    "|.|", // 1  ┃ . ┃
    "L-J", // 2  ┗ ━ ┛
  ];

  test("mapInput returns grid and startingPoint", () => {
    const { grid, startingGridItem } = mapInput(smallInput);

    expect(startingGridItem).toMatchObject({ row: 0, col: 0 });

    expect(grid).toMatchObject([
      [
        { row: 0, col: 0, value: Connector["┏"] },
        { row: 0, col: 1, value: Connector["━"] },
        { row: 0, col: 2, value: Connector["┓"] },
      ],
      [
        { row: 1, col: 0, value: Connector["┃"] },
        { row: 1, col: 1, value: EMPTY },
        { row: 1, col: 2, value: Connector["┃"] },
      ],
      [
        { row: 2, col: 0, value: Connector["┗"] },
        { row: 2, col: 1, value: Connector["━"] },
        { row: 2, col: 2, value: Connector["┛"] },
      ],
    ]);
  });

  test("getAdjacentItems returns adjacent items", () => {
    const { grid } = mapInput(smallInput);
    const adjacentItems = getAdjacentItems(grid, grid[1][1]);

    expect(adjacentItems).toMatchObject({
      north: { row: 0, col: 1, value: Connector["━"] },
      east: { row: 1, col: 2, value: Connector["┃"] },
      south: { row: 2, col: 1, value: Connector["━"] },
      west: { row: 1, col: 0, value: Connector["┃"] },
    });
  });

  it.each(
    // prettier-ignore
    [
      [0, 0, Connector["┏"]], [0, 2, Connector["┓"]],
      [2, 0, Connector["┗"]], [2, 2, Connector["┛"]],
    ]
  )(
    "guessStartingConnectorType returns the correct connector at row=%d, col=%d for %s",
    (row, col, connector) => {
      const { grid } = mapInput(smallInput);

      expect(guessStartingConnectorType(grid, { row, col })).toBe(connector);
    }
  );

  describe("part 1", () => {
    const sample1: string[] = [
      // break
      ".....", // .....
      ".S-7.", // .┏━┓.
      ".|.|.", // .┃.┃.
      ".L-J.", // .┗━┛.
      ".....", // .....
    ];

    const sample2: string[] = [
      // break
      "..F7.",
      ".FJ|.",
      "SJ.L7",
      "|F--J",
      "LJ...",
    ];

    it("should return the correct sample1 value", () => {
      expect(run1(sample1)).toBe(4);
    });

    it("should return the correct sample2 value", () => {
      expect(run1(sample2)).toBe(8);
    });

    it("should return the correct value", () => {
      expect(run1(input)).toBe(7102);
    });
  });

  describe.skip("part 2", () => {
    const sample1 = [
      "...........", // ...........
      ".S-------7.", // .┏━━━━━━━┓.
      ".|F-----7|.", // .┃┏━━━━━┓┃.
      ".||.....||.", // .┃┃.....┃┃.
      ".||.....||.", // .┃┃.....┃┃.
      ".|L-7.F-J|.", // .┃┗━┓.┏━┛┃.
      ".|..|.|..|.", // .┃..┃.┃..┃.
      ".L--J.L--J.", // .┗━━┛.┗━━┛.
      "...........", // ...........
    ];

    const sample2 = [
      ".F----7F7F7F7F-7....", // .┏━━━━┓┏┓┏┓┏┓┏━┓....
      ".|F--7||||||||FJ....", // .┃┏━━┓┃┃┃┃┃┃┃┃┏┛....
      ".||.FJ||||||||L7....", // .┃┃.┏┛┃┃┃┃┃┃┃┃┗┓....
      "FJL7L7LJLJ||LJ.L-7..", // ┏┛┗┓┗┓┗┛┗┛┃┃┗┛.┗━┓..
      "L--J.L7...LJS7F-7L7.", // ┗━━┛.┗┓...┗┛┏┓┏━┓┗┓.
      "....F-J..F7FJ|L7L7L7", // ....┏━┛..┏┓┏┛┃┗┓┗┓┗┓
      "....L7.F7||L7|.L7L7|", // ....┗┓.┏┓┃┃┗┓┃.┗┓┗┓┃
      ".....|FJLJ|FJ|F7|.LJ", // .....┃┏┛┗┛┃┏┛┃┏┓┃.┗┛
      "....FJL-7.||.||||...", // ....┏┛┗━┓.┃┃.┃┃┃┃...
      "....L---J.LJ.LJLJ...", // ....┗━━━┛.┗┛.┗┛┗┛...
    ];

    it("should return the correct sample value", () => {
      expect(run2(sample1)).toBe(0);
    });

    it("should return the correct value", () => {
      expect(run2(input)).toBe(0);
    });
  });
});
