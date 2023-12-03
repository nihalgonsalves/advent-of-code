import { describe, it, expect } from "bun:test";

import { readCharAt, readSymbolsAround, run1 } from "./solution";
import { getInputLines } from "../../getInputLines";

const input = await getInputLines(import.meta.url);

const sample = [
  "467..114..",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598..",
];

describe("day 03", () => {
  it("readCharAt returns char", () => {
    expect<string | undefined>(readCharAt(sample, 0, 0)).toBe("4");
    expect<string | undefined>(readCharAt(sample, 0, -1)).toBe(undefined);
    expect<string | undefined>(readCharAt(sample, -1, -1)).toBe(undefined);
  });

  it("readSymbolsAround returns all symbols", () => {
    expect(readSymbolsAround(sample, 0, 0)).toEqual([]);
    expect(readSymbolsAround(sample, 2, 6)).toEqual(["#"]);
    expect(
      readSymbolsAround(
        [
          // break
          "abc",
          "h.d",
          "gfe",
        ],
        1,
        1
      )
    ).toEqual(["a", "b", "c", "d", "e", "f", "g", "h"]);
  });

  describe("part 1", () => {
    it("should return the correct sample value", () => {
      expect(run1(sample)).toBe(4361);
    });

    it("should return the correct value", () => {
      expect(run1(input)).toBe(550064);
    });
  });
});
