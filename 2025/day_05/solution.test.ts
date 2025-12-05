import { describe, expect, it } from "bun:test";
import { getInput } from "../../getInputLines";
import { allPairs, run1, run2, simplifyRanges } from "./solution";

const input = await getInput(import.meta.url);

const sample: string = `3-5
10-14
16-20
12-18

1
5
8
11
17
32
`;

describe("day 05", () => {
	describe("allPairs", () => {
		it("should return the correct pairs", () => {
			expect(allPairs(["x", "y", "z"])).toMatchObject([
				[
					{ i: 0, a: "x" },
					{ j: 1, b: "y" },
				],
				[
					{ i: 0, a: "x" },
					{ j: 2, b: "z" },
				],
				[
					{ i: 1, a: "y" },
					{ j: 2, b: "z" },
				],
			]);
		});
	});

	describe("simplifyRanges", () => {
		it("should remove ranges that are fully contained in other ranges", () => {
			expect(
				simplifyRanges([
					{ start: 1, end: 10 },
					{ start: 5, end: 8 },
				]),
			).toEqual([{ start: 1, end: 10 }]);

			expect(
				simplifyRanges([
					{ start: 5, end: 8 },
					{ start: 1, end: 10 },
				]),
			).toEqual([{ start: 1, end: 10 }]);
		});

		it("should merge ranges that overlap with other ranges", () => {
			expect(
				simplifyRanges([
					{ start: 1, end: 6 },
					{ start: 5, end: 10 },
				]),
			).toEqual([{ start: 1, end: 10 }]);

			expect(
				simplifyRanges([
					{ start: 5, end: 10 },
					{ start: 1, end: 6 },
				]),
			).toEqual([{ start: 1, end: 10 }]);
		});
	});

	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(3);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(529);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(14);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(344260049617193);
		});
	});
});
