import { describe, it, expect } from "bun:test";

import { run1, run2 } from "./solution";
import { getInputLines } from "../../getInputLines";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	// break
	"Time:      7  15   30",
	"Distance:  9  40  200",
];

describe("day 06", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(288);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(861300);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(71503);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(28101347);
		});
	});
});
