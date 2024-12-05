import { describe, expect, it } from "bun:test";

import { getInput } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInput(import.meta.url);

const sample = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47

`;

describe("day 05", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(143);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(5639);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(123);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(5273);
		});
	});
});
