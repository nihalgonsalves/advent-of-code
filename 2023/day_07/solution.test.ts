import { describe, it, expect } from "bun:test";

import { Card, Type, calcType2, run1, run2 } from "./solution";
import { getInputLines } from "../../getInputLines";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	"32T3K 765",
	"T55J5 684",
	"KK677 28",
	"KTJJT 220",
	"QQQJA 483",
];

describe("day 07", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(6440);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(248113761);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(5905);
		});

		it.each([
			// uniq 1
			["XXXXX", Type.FIVE_OF_A_KIND],

			// uniq 2, with J
			["XXXXJ", Type.FIVE_OF_A_KIND],
			["XXXJJ", Type.FIVE_OF_A_KIND],
			["XXJJJ", Type.FIVE_OF_A_KIND],
			["XJJJJ", Type.FIVE_OF_A_KIND],
			// uniq 2, without J
			["XXXXY", Type.FOUR_OF_A_KIND],
			["XYYYY", Type.FOUR_OF_A_KIND],
			["XXXYY", Type.FULL_HOUSE],
			["XXYYY", Type.FULL_HOUSE],

			// uniq 3, with 1 J
			["XXXYJ", Type.FOUR_OF_A_KIND],
			["XYYYJ", Type.FOUR_OF_A_KIND],
			["XXYYJ", Type.FULL_HOUSE],
			// uniq 3, with 2 J
			["XXYJJ", Type.FOUR_OF_A_KIND],
			["XYYJJ", Type.FOUR_OF_A_KIND],
			["XXYJJ", Type.FOUR_OF_A_KIND],
			// uniq 3, without J
			["XXXYZ", Type.THREE_OF_A_KIND],
			["XYYYZ", Type.THREE_OF_A_KIND],
			["XYZZZ", Type.THREE_OF_A_KIND],
			["XXYYZ", Type.TWO_PAIR],
			["XYYZZ", Type.TWO_PAIR],
			["XXYZZ", Type.TWO_PAIR],

			// uniq 4, with J
			["XXYZJ", Type.THREE_OF_A_KIND],
			["XYYZJ", Type.THREE_OF_A_KIND],
			["XYZZJ", Type.THREE_OF_A_KIND],
			["XYZJJ", Type.THREE_OF_A_KIND],
			// uniq 4, without J
			["XXYZA", Type.ONE_PAIR],
			["XYYZA", Type.ONE_PAIR],
			["XYZZA", Type.ONE_PAIR],
			["XYZAA", Type.ONE_PAIR],

			// uniq 5, with J
			["XYZAJ", Type.ONE_PAIR],
			// uniq 5, without J
			["XYZAB", Type.HIGH_CARD],
		])("should calculate the type of %s correctly", (cards, expected) => {
			expect(calcType2(cards.split("") as Card[])).toBe(expected);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(246285222);
		});
	});
});
