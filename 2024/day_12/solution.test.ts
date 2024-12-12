import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	"RRRRIICCFF",
	"RRRRIICCCF",
	"VVRRRCCFFF",
	"VVRCCCJFFF",
	"VVVVCJJCFE",
	"VVIVCCJJEE",
	"VVIIICJJEE",
	"MIIIIIJJEE",
	"MIIISIJEEE",
	"MMMISSJEEE",
];

const sampleA = [
	// break
	"AAAA",
	"BBCD",
	"BBCC",
	"EEEC",
];

const sampleB = [
	// break
	"OOOOO",
	"OXOXO",
	"OOOOO",
	"OXOXO",
	"OOOOO",
];

describe("day 12", () => {
	describe("part 1", () => {
		it("should return the correct sample value (a)", () => {
			expect(run1(sampleA)).toBe(140);
		});

		it("should return the correct sample value (b)", () => {
			expect(run1(sampleB)).toBe(772);
		});

		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(1930);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(1431316);
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
