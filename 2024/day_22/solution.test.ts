import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

describe("day 22", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(["1", "10", "100", "2024"])).toBe(37327623n);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(13429191512n);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(["1", "2", "3", "2024"])).toBe(23);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(1582);
		});
	});
});
