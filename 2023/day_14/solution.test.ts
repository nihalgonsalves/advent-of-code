import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	"O....#....",
	"O.OO#....#",
	".....##...",
	"OO.#O....O",
	".O.....O#.",
	"O.#..O.#.#",
	"..O..#O..O",
	".......O..",
	"#....###..",
	"#OO..#....",
];

describe("day 14", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(136);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(112048);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(64);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(105606);
		});
	});
});
