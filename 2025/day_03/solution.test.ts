import { describe, expect, it } from "bun:test";
import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	"987654321111111",
	"811111111111119",
	"234234234234278",
	"818181911112111",
];

describe("day 03", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(357);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(17535);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(3121910778619);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(173577199527257);
		});
	});
});
