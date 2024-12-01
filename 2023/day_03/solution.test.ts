import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { readCharAt, readSymbolsAround, run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample = [
	"467..114..",
	"...*......",
	"..35..633.",
	"......#...",
	"617*......",
	".....+.58.",
	"..592.....",
	"......755.",
	"...$.*....",
	".664.598..",
];

describe("day 03", () => {
	it("readCharAt returns char", () => {
		expect(readCharAt(sample, 0, 0)).toEqual({ value: "4", line: 0, index: 0 });
		expect(readCharAt(sample, 0, -1)).toEqual({
			value: undefined,
			line: 0,
			index: -1,
		});
		expect(readCharAt(sample, -1, -1)).toEqual({
			value: undefined,
			line: -1,
			index: -1,
		});
	});

	it("readSymbolsAround returns all symbols", () => {
		expect(readSymbolsAround(sample, 0, 0)).toEqual([]);
		expect(readSymbolsAround(sample, 2, 6)).toEqual([
			{ value: "#", line: 3, index: 6 },
		]);
		expect(
			readSymbolsAround(
				[
					// break
					"abc",
					"h.d",
					"gfe",
				],
				1,
				1,
			),
		).toEqual([
			{
				index: 0,
				line: 0,
				value: "a",
			},
			{
				index: 1,
				line: 0,
				value: "b",
			},
			{
				index: 2,
				line: 0,
				value: "c",
			},
			{
				index: 2,
				line: 1,
				value: "d",
			},
			{
				index: 2,
				line: 2,
				value: "e",
			},
			{
				index: 1,
				line: 2,
				value: "f",
			},
			{
				index: 0,
				line: 2,
				value: "g",
			},
			{
				index: 0,
				line: 1,
				value: "h",
			},
		]);
	});

	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(4361);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(550064);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(467835);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(85010461);
		});
	});
});
