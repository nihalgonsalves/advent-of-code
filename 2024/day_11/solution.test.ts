import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = ["125 17"];

describe("day 11", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(55312);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(233875);
		});
	});

	describe("part 2", () => {
		it("should return the correct value", () => {
			expect(run2(input)).toBe(0);
		});
	});
});
