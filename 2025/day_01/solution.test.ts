import { describe, expect, it } from "bun:test";
import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	"L68",
	"L30",
	"R48",
	"L5",
	"R60",
	"L55",
	"L1",
	"L99",
	"R14",
	"L82",
];

describe("day 01", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(3);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(1066);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(6);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(6223);
		});
	});
});
