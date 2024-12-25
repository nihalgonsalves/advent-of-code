import { describe, expect, it } from "bun:test";

import { getInput } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInput(import.meta.url);

const sample = `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####
`;

describe("day 00", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(3);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(3395);
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
