import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	"Register A: 729",
	"Register B: 0",
	"Register C: 0",
	"Program: 0,1,5,4,3,0",
];

describe("day 17", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe("4,6,3,5,6,3,5,2,1,0");
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe("7,1,5,2,4,0,7,6,1");
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
