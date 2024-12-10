import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	"89010123",
	"78121874",
	"87430965",
	"96549874",
	"45678903",
	"32019012",
	"01329801",
	"10456732",
];

describe("day 10", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(
				run1([
					// linebreak
					"0123",
					"1234",
					"8765",
					"9876",
				]),
			).toBe(1);

			expect(run1(sample)).toBe(36);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(820);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(81);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(1786);
		});
	});
});
