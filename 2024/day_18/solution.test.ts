import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	"5,4",
	"4,2",
	"4,5",
	"3,0",
	"2,1",
	"6,3",
	"2,4",
	"1,5",
	"0,6",
	"3,3",
	"2,6",
	"5,1",
	"1,2",
	"5,5",
	"2,5",
	"6,5",
	"1,4",
	"0,4",
	"6,4",
	"1,1",
	"6,1",
	"1,0",
	"0,5",
	"1,6",
	"2,0",
];

describe("day 00", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample, 6, 6, 12)).toBe(22);
		});

		it("should return the correct value", () => {
			expect(run1(input, 70, 70, 1024)).toBe(374);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample, 6, 6)).toMatchObject({ x: 6, y: 1 });
		});

		it("should return the correct value", () => {
			expect(run2(input, 70, 70, 2900)).toMatchObject({ x: 30, y: 12 });
		});
	});
});
