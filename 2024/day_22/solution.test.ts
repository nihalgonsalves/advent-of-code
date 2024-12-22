import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = ["1", "10", "100", "2024"];

describe("day 00", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(37327623n);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(13429191512n);
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
