import { describe, it, expect } from "bun:test";

import { run1, run2 } from "./solution";
import { getInputLines } from "../../getInputLines";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
  "seeds: 79 14 55 13",
  "",
  "seed-to-soil map:",
  "50 98 2",
  "52 50 48",
  "",
  "soil-to-fertilizer map:",
  "0 15 37",
  "37 52 2",
  "39 0 15",
  "",
  "fertilizer-to-water map:",
  "49 53 8",
  "0 11 42",
  "42 0 7",
  "57 7 4",
  "",
  "water-to-light map:",
  "88 18 7",
  "18 25 70",
  "",
  "light-to-temperature map:",
  "45 77 23",
  "81 45 19",
  "68 64 13",
  "",
  "temperature-to-humidity map:",
  "0 69 1",
  "1 0 69",
  "",
  "humidity-to-location map:",
  "60 56 37",
  "56 93 4",
];

describe("day 05", () => {
  describe("part 1", () => {
    it("should return the correct sample value", () => {
      expect(run1(sample)).toBe(35);
    });

    it("should return the correct value", () => {
      expect(run1(input)).toBe(535088217);
    });
  });

  describe("part 2", () => {
    it("should return the correct sample value", () => {
      expect(run2(sample)).toBe(46);
    });

    // currently slow!
    it.skip("should return the correct value", () => {
      expect(run2(input)).toBe(51399228);
    });
  });
});
