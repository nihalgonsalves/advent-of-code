import { describe, expect, it } from "vitest";

import { getInputLines } from "../../getInputLines";

import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = ["7,1", "11,1", "11,7", "9,7", "9,5", "2,5", "2,3", "7,3"];

describe("day 09", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(50);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(4777967538);
		});
	});

	describe.skip("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(24);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(0);
		});
	});
});
