import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	"2413432311323",
	"3215453535623",
	"3255245654254",
	"3446585845452",
	"4546657867536",
	"1438598798454",
	"4457876987766",
	"3637877979653",
	"4654967986887",
	"4564679986453",
	"1224686865563",
	"2546548887735",
	"4322674655533",
];

describe("day 17", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(102);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(817);
		});
	});

	describe("part 2", () => {
		const sample2 = [
			"111111111111",
			"999999999991",
			"999999999991",
			"999999999991",
			"999999999991",
		];

		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(94);
		});

		it("should return the correct sample2 value", () => {
			expect(run2(sample2)).toBe(71);
		});

		// Currently slightly off, correct answer is within 920..947, but those are wrong
		it.todo("should return the correct value", () => {
			expect(run2(input)).toBe(0);
		});
	});
});
