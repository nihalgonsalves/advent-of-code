import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { rangeIntersection, run1, run2, splitRange } from "./solution";

const input = await getInputLines(import.meta.url);

// destination source length

const sample: string[] = [
	"seeds: 79 14 55 13",
	"",
	"seed-to-soil map:",
	"50 98 2",
	"52 50 48",
	"",
	"soil-to-fertilizer map:",
	"0 15 37",
	"37 52 2",
	"39 0 15",
	"",
	"fertilizer-to-water map:",
	"49 53 8",
	"0 11 42",
	"42 0 7",
	"57 7 4",
	"",
	"water-to-light map:",
	"88 18 7",
	"18 25 70",
	"",
	"light-to-temperature map:",
	"45 77 23",
	"81 45 19",
	"68 64 13",
	"",
	"temperature-to-humidity map:",
	"0 69 1",
	"1 0 69",
	"",
	"humidity-to-location map:",
	"60 56 37",
	"56 93 4",
];

describe("day 05", () => {
	const range = (
		start: number,
		endInclusive: number,
		destinationOffset = 0,
	) => ({
		start,
		endInclusive,
		destinationOffset,
	});

	describe("rangeIntersection", () => {
		// prettier-ignore
		(
			[
				[
					[0, 10],
					[5, 15],
					[5, 10],
				],
				[
					[0, 10],
					[10, 15],
					[10, 10],
				],
				[[0, 10], [15, 20], undefined],
			] as const
		).map(([a, b, intersection]) => {
			it(`should return ${intersection ? `[${intersection}]` : "undefined"} for [${a}] and [${b}]`, () => {
				expect<unknown>(
					rangeIntersection(range(a[0], a[1]), range(b[0], b[1])),
				).toEqual(
					intersection ? range(intersection[0], intersection[1]) : undefined,
				);
			});
		});
	});

	describe("splitRange", () => {
		it("splits a range with no intersections", () => {
			expect(splitRange(range(0, 10), [])).toEqual([range(0, 10)]);
		});

		it("splits a range with an intersection within", () => {
			expect(splitRange(range(0, 10), [range(4, 6)])).toEqual([
				range(0, 3),
				range(4, 6),
				range(7, 10),
			]);
		});

		it("splits a range with two adjacent mappings", () => {
			expect(splitRange(range(0, 10), [range(4, 6), range(7, 9)])).toEqual([
				range(0, 3),
				range(4, 6),
				range(7, 9),
				range(10, 10),
			]);
		});

		it("splits a range with two mappings with a gap in between", () => {
			expect(splitRange(range(0, 10), [range(4, 5), range(8, 9)])).toEqual([
				range(0, 3),
				range(4, 5),
				range(6, 7),
				range(8, 9),
				range(10, 10),
			]);
		});

		it("offsets correctly", () => {
			expect(
				splitRange(range(0, 10), [range(4, 5, -1), range(8, 9, 1)]),
			).toEqual([
				// start gap fill
				range(0, 3),
				// first intersection
				range(4 - 1, 5 - 1),
				// gap fill
				range(6, 7),
				// second intersection
				range(8 + 1, 9 + 1),
				// end gap fill
				range(10, 10),
			]);
		});
	});

	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(35);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(535088217);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(46);
		});

		// currently slow!
		it("should return the correct value", () => {
			expect(run2(input)).toBe(51399228);
		});
	});
});
