import { describe, it, expect } from "bun:test";

import { run1, run2 } from "./solution";
import { getInputLines } from "../../getInputLines";

const input = await getInputLines(import.meta.url);

describe("day 00", () => {
  describe("part 1", () => {
    const sample1 = [
      "RL",
      "AAA = (BBB, CCC)",
      "BBB = (DDD, EEE)",
      "CCC = (ZZZ, GGG)",
      "DDD = (DDD, DDD)",
      "EEE = (EEE, EEE)",
      "GGG = (GGG, GGG)",
      "ZZZ = (ZZZ, ZZZ)",
    ];

    const sample2 = [
      "LLR",
      "AAA = (BBB, BBB)",
      "BBB = (AAA, ZZZ)",
      "ZZZ = (ZZZ, ZZZ)",
    ];

    it("should return the correct sample value", () => {
      expect(run1(sample1)).toBe(2);
      expect(run1(sample2)).toBe(6);
    });

    it("should return the correct value", () => {
      expect(run1(input)).toBe(21251);
    });
  });

  describe("part 2", () => {
    const sample: string[] = [
      "LR",
      "11A = (11B, XXX)",
      "11B = (XXX, 11Z)",
      "11Z = (11B, XXX)",
      "22A = (22B, XXX)",
      "22B = (22C, 22C)",
      "22C = (22Z, 22Z)",
      "22Z = (22B, 22B)",
      "XXX = (XXX, XXX)",
    ];

    it("should return the correct sample value", () => {
      expect(run2(sample)).toBe(6);
    });

    // does not work currently
    it.skip("should return the correct value", () => {
      expect(run2(input)).toBe(0);
    });
  });
});
