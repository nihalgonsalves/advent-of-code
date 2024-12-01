import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	// biome-linebreak
	"3   4",
	"4   3",
	"2   5",
	"1   3",
	"3   9",
	"3   3",
];

describe("day 01", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(11);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(1970720);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(31);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(17191599);
		});
	});
});
