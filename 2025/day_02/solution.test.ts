import { describe, expect, it } from "bun:test";
import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	"11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124",
];

describe("day 02", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(1227775554);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(32976912643);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(4174379265);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(54446379122);
		});
	});
});
