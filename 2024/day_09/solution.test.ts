import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = ["2333133121414131402"];

describe("day 09", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(1928);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(6399153661894);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(2858);
		});

		// slow (30s)
		it.skip("should return the correct value", () => {
			expect(run2(input)).toBe(6421724645083);
		});
	});
});
