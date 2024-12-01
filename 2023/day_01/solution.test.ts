import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

describe("day 1", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(
				run1([
					// break
					"1abc2",
					"pqr3stu8vwx",
					"a1b2c3d4e5f",
					"treb7uchet",
				]),
			).toBe(142);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(55002);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(
				run2([
					"two1nine",
					"eightwothree",
					"abcone2threexyz",
					"xtwone3four",
					"4nineeightseven2",
					"zoneight234",
					"7pqrstsixteen",
				]),
			).toBe(281);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(55093);
		});
	});
});
