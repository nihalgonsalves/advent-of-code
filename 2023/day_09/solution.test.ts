import { describe, it, expect } from "bun:test";

import { run1, run2 } from "./solution";
import { getInputLines } from "../../getInputLines";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
  "0 3 6 9 12 15",
  "1 3 6 10 15 21",
  "10 13 16 21 30 45",
];

describe("day 09", () => {
  describe("part 1", () => {
    it("should return the correct sample value", () => {
      expect(run1(sample)).toBe(114);
    });

    it("should return the correct value", () => {
      expect(run1(input)).toBe(2038472161);
    });
  });

  describe("part 2", () => {
    it("should return the correct sample value", () => {
      expect(run2(sample)).toBe(2);
    });

    it("should return the correct value", () => {
      expect(run2(input)).toBe(1091);
    });
  });
});
