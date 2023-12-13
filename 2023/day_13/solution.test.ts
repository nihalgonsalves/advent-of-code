import { describe, it, expect } from "bun:test";

import { run1, run2 } from "./solution";
import { getInput } from "../../getInputLines";

const input = await getInput(import.meta.url);

// prettier-ignore
const sample =
`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

describe("day 13", () => {
  describe("part 1", () => {
    it("should return the correct sample value", () => {
      expect(run1(sample)).toBe(405);
    });

    it("should return the correct value", () => {
      expect(run1(input)).toBe(33975);
    });
  });

  describe("part 2", () => {
    it("should return the correct sample value", () => {
      expect(run2(sample)).toBe(400);
    });

    it("should return the correct value", () => {
      expect(run2(input)).toBe(29083);
    });
  });
});
