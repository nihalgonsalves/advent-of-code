import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	"p=0,4 v=3,-3",
	"p=6,3 v=-1,-3",
	"p=10,3 v=-1,2",
	"p=2,0 v=2,-1",
	"p=0,0 v=1,3",
	"p=3,0 v=-2,-2",
	"p=7,6 v=-1,-3",
	"p=3,0 v=-1,-2",
	"p=9,3 v=2,3",
	"p=7,3 v=-1,2",
	"p=2,4 v=2,-3",
	"p=9,5 v=-3,-3",
];

describe("day 14", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample, 11, 7)).toBe(12);
		});

		it("should return the correct value", () => {
			expect(run1(input, 101, 103)).toBe(233709840);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(0);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(0);
		});
	});
});
