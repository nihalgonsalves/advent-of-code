import { describe, it, expect, test } from "bun:test";

import { mapInput, run2 } from "./solution2";
import { tupleGridToGrid } from "./common";
import { getInputLines } from "../../getInputLines";

const input = await getInputLines(import.meta.url);

describe("day 10 > part 2", () => {
  const smallInput = [
    //           0 1 2
    "S-7", // 0  ╳ ━ ┓
    "|.|", // 1  ┃ . ┃
    "L-J", // 2  ┗ ━ ┛
  ];

  test("mapInput returns padded grid and startingPoint", () => {
    const { grid, startingGridItem } = mapInput(smallInput);

    expect(startingGridItem).toMatchObject({ row: 1, col: 1 });

    expect(grid).toMatchObject(
      tupleGridToGrid([
        ["*", "*", "*", "*", "*", "*", "*"],
        ["*", "┏", "━", "━", "━", "┓", "*"],
        ["*", "┃", "*", "*", "*", "┃", "*"],
        ["*", "┃", "*", ".", "*", "┃", "*"],
        ["*", "┃", "*", "*", "*", "┃", "*"],
        ["*", "┗", "━", "━", "━", "┛", "*"],
        ["*", "*", "*", "*", "*", "*", "*"],
      ]),
    );
  });

  const sample1 = [
    "...........", // •••••••••••
    ".S-------7.", // •┏━━━━━━━┓•
    ".|F-----7|.", // •┃┏━━━━━┓┃•
    ".||.....||.", // •┃┃•••••┃┃•
    ".||.....||.", // •┃┃•••••┃┃•
    ".|L-7.F-J|.", // •┃┗━┓•┏━┛┃•
    ".|..|.|..|.", // •┃••┃•┃••┃•
    ".L--J.L--J.", // •┗━━┛•┗━━┛•
    "...........", // •••••••••••
  ];

  const sample2 = [
    "..........", // ••••••••••
    ".S------7.", // •┏━━━━━━┓•
    ".|F----7|.", // •┃┏━━━━┓┃•
    ".||....||.", // •┃┃••••┃┃•
    ".||....||.", // •┃┃••••┃┃•
    ".|L-7F-J|.", // •┃┗━┓┏━┛┃•
    ".|..||..|.", // •┃••┃┃••┃•
    ".L--JL--J.", // •┗━━┛┗━━┛•
    "..........", // ••••••••••
  ];

  const sample3 = [
    ".F----7F7F7F7F-7....", // •┏━━━━┓┏┓┏┓┏┓┏━┓••••
    ".|F--7||||||||FJ....", // •┃┏━━┓┃┃┃┃┃┃┃┃┏┛••••
    ".||.FJ||||||||L7....", // •┃┃•┏┛┃┃┃┃┃┃┃┃┗┓••••
    "FJL7L7LJLJ||LJ.L-7..", // ┏┛┗┓┗┓┗┛┗┛┃┃┗┛•┗━┓••
    "L--J.L7...LJS7F-7L7.", // ┗━━┛•┗┓•••┗┛┏┓┏━┓┗┓•
    "....F-J..F7FJ|L7L7L7", // ••••┏━┛••┏┓┏┛┃┗┓┗┓┗┓
    "....L7.F7||L7|.L7L7|", // ••••┗┓•┏┓┃┃┗┓┃•┗┓┗┓┃
    ".....|FJLJ|FJ|F7|.LJ", // •••••┃┏┛┗┛┃┏┛┃┏┓┃•┗┛
    "....FJL-7.||.||||...", // ••••┏┛┗━┓•┃┃•┃┃┃┃•••
    "....L---J.LJ.LJLJ...", // ••••┗━━━┛•┗┛•┗┛┗┛•••
  ];

  const sample4 = [
    "FF7FSF7F7F7F7F7F---7", // ╔┏┓┏┓┏┓┏┓┏┓┏┓┏┓┏━━━┓
    "L|LJ||||||||||||F--J", // ╚┃┗┛┃┃┃┃┃┃┃┃┃┃┃┃┏━━┛
    "FL-7LJLJ||||||LJL-77", // ╔┗━┓┗┛┗┛┃┃┃┃┃┃┗┛┗━┓╗
    "F--JF--7||LJLJ7F7FJ-", // ┏━━┛┏━━┓┃┃┗┛┗┛╗┏┓┏┛═
    "L---JF-JLJ.||-FJLJJ7", // ┗━━━┛┏━┛┗┛•║║═┏┛┗┛╝╗
    "|F|F-JF---7F7-L7L|7|", // ║╔║┏━┛┏━━━┓╔╗═┗┓╚║╗║
    "|FFJF7L7F-JF7|JL---7", // ║╔┏┛┏┓┗┓┏━┛┏┓║╝┗━━━┓
    "7-L-JL7||F7|L7F-7F7|", // ╗═┗━┛┗┓┃┃┏┓┃┗┓┏━┓┏┓┃
    "L.L7LFJ|||||FJL7||LJ", // ╚•╚╗╚┏┛┃┃┃┃┃┏┛┗┓┃┃┗┛
    "L7JLJL-JLJLJL--JLJ.L", // ╚╗╝╚╝┗━┛┗┛┗┛┗━━┛┗┛•╚
  ];

  const print = process.env.PRINT != null;

  it("should return the correct sample1 value", () => {
    expect(run2(sample1, print)).toBe(4);
  });

  it("should return the correct sample2 value", () => {
    expect(run2(sample2, print)).toBe(4);
  });

  it("should return the correct sample3 value", () => {
    expect(run2(sample3, print)).toBe(8);
  });

  it("should return the correct sample4 value", () => {
    expect(run2(sample4, print)).toBe(10);
  });

  it("should return the correct value", () => {
    expect(run2(input, print)).toBe(363);
  });
});
