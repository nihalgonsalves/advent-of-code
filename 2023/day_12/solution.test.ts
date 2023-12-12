import { describe, it, expect } from "bun:test";

import { permutations, run1, run2 } from "./solution";
import { getInputLines } from "../../getInputLines";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
  "???.### 1,1,3",
  ".??..??...?##. 1,1,3",
  "?#?#?#?#?#?#?#? 1,3,1,6",
  "????.#...#... 4,1,1",
  "????.######..#####. 1,6,5",
  "?###???????? 3,2,1",
];

describe("day 12", () => {
  describe("permutations", () => {
    it("returns all permutations of a count", () => {
      expect(permutations(2)).toEqual([
        ["#", "#"],
        [".", "#"],
        ["#", "."],
        [".", "."],
      ]);

      expect(permutations(5)).toEqual([
        ["#", "#", "#", "#", "#"],
        [".", "#", "#", "#", "#"],
        ["#", ".", "#", "#", "#"],
        [".", ".", "#", "#", "#"],
        ["#", "#", ".", "#", "#"],
        [".", "#", ".", "#", "#"],
        ["#", ".", ".", "#", "#"],
        [".", ".", ".", "#", "#"],
        ["#", "#", "#", ".", "#"],
        [".", "#", "#", ".", "#"],
        ["#", ".", "#", ".", "#"],
        [".", ".", "#", ".", "#"],
        ["#", "#", ".", ".", "#"],
        [".", "#", ".", ".", "#"],
        ["#", ".", ".", ".", "#"],
        [".", ".", ".", ".", "#"],
        ["#", "#", "#", "#", "."],
        [".", "#", "#", "#", "."],
        ["#", ".", "#", "#", "."],
        [".", ".", "#", "#", "."],
        ["#", "#", ".", "#", "."],
        [".", "#", ".", "#", "."],
        ["#", ".", ".", "#", "."],
        [".", ".", ".", "#", "."],
        ["#", "#", "#", ".", "."],
        [".", "#", "#", ".", "."],
        ["#", ".", "#", ".", "."],
        [".", ".", "#", ".", "."],
        ["#", "#", ".", ".", "."],
        [".", "#", ".", ".", "."],
        ["#", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
      ]);
    });
  });
  describe("part 1", () => {
    it("should return the correct sample value", () => {
      expect(run1(sample)).toBe(21);
    });

    it("should return the correct value", () => {
      expect(run1(input)).toBe(7622);
    });
  });

  describe("part 2", () => {
    it("should return the correct sample value", () => {
      expect(run2(sample)).toBe(0);
    });

    it("should return the correct value", () => {
      expect(run2(input)).toBe(0);
    });
  });
});
