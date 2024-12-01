import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { run1, run2, shoelace } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	"R 6 (#70c710)",
	"D 5 (#0dc571)",
	"L 2 (#5713f0)",
	"D 2 (#d2c081)",
	"R 2 (#59c680)",
	"D 2 (#411b91)",
	"L 5 (#8ceee2)",
	"U 2 (#caa173)",
	"L 1 (#1b58a2)",
	"U 2 (#caa171)",
	"R 2 (#7807d2)",
	"U 3 (#a77fa3)",
	"L 2 (#015232)",
	"U 2 (#7a21e3)",
];

describe("day 18", () => {
	describe("shoelace", () => {
		it("should return the correct value", () => {
			expect(
				shoelace([
					[2, 7],
					[10, 1],
					[8, 6],
					[11, 7],
					[7, 10],
				]),
			).toBe(32);
		});
	});

	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(62);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(62573);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(952408144115);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(54662804037719);
		});
	});
});
