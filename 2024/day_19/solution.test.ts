import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	"r, wr, b, g, bwu, rb, gb, br",
	"brwrr",
	"bggr",
	"gbbr",
	"rrbgbr",
	"ubwu",
	"bwurrg",
	"brgr",
	"bbrgwb",
];

describe("day 19", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(6);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(260);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(16);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(639963796864990);
		});
	});
});
