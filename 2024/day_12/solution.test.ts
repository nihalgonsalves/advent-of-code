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
		it("should return the correct sample value (a)", () => {
			expect(run2(sampleA)).toBe(80);
		});

		it("should return the correct sample value (b)", () => {
			expect(run2(sampleB)).toBe(436);
		});

		it("should return the correct sample value (c)", () => {
			expect(
				run2([
					// break
					"EEEEE",
					"EXXXX",
					"EEEEE",
					"EXXXX",
					"EEEEE",
				]),
			).toBe(236);
		});

		it("should return the correct sample value (d)", () => {
			expect(
				run2([
					// break
					"AAAAAA",
					"AAABBA",
					"AAABBA",
					"ABBAAA",
					"ABBAAA",
					"AAAAAA",
				]),
			).toBe(368);
		});

		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(1206);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(821428);
		});
	});
});
