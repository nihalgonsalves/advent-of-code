import { describe, expect, it } from "bun:test";
import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	"123 328  51 64 ",
	" 45 64  387 23 ",
	"  6 98  215 314",
	"*   +   *   +  ",
];

describe("day 06", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(4277556);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(5227286044585);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(3263827);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(10227753257799);
		});
	});
});
