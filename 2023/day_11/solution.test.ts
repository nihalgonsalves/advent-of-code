import { describe, it, expect } from "bun:test";

import { run } from "./solution";
import { getInputLines } from "../../getInputLines";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	"...#......",
	".......#..",
	"#.........",
	"..........",
	"......#...",
	".#........",
	".........#",
	"..........",
	".......#..",
	"#...#.....",
];

describe("day 11", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run(sample)).toBe(374);
		});

		it("should return the correct value", () => {
			expect(run(input)).toBe(9521776);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run(sample, 10)).toBe(1030);
			expect(run(sample, 100)).toBe(8410);
		});

		it("should return the correct value", () => {
			expect(run(input, 1000000)).toBe(553224415344);
		});
	});
});
