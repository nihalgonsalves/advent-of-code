import { describe, it, expect } from "bun:test";

import { run1, run2 } from "./solution";
import { getInputLines } from "../../getInputLines";

const input = await getInputLines(import.meta.url);

describe("day 02", () => {
  it("should return the correct value for part 1", () => {
    expect(run1(input)).toBe(2720);
  });

  it("should return the correct value for part 2", () => {
    expect(run2(input)).toBe(71535);
  });
});
