import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	"190: 10 19",
	"3267: 81 40 27",
	"83: 17 5",
	"156: 15 6",
	"7290: 6 8 6 15",
	"161011: 16 10 13",
	"192: 17 8 14",
	"21037: 9 7 18 13",
	"292: 11 6 16 20",
];

describe("day 07", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(3749);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(945512582195);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(11387);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(271691107779347);
		});
	});
});
