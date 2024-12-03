import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

describe("day 03", () => {
	describe("part 1", () => {
		const sample: string[] = [
			"xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
		];

		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(161);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(166630675);
		});
	});

	describe("part 2", () => {
		const sample: string[] = [
			"xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
		];

		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(48);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(93465710);
		});
	});
});
