import { describe, expect, it } from "bun:test";

import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	".|...\\....",
	"|.-.\\.....",
	".....|-...",
	"........|.",
	"..........",
	".........\\",
	"..../.\\\\..",
	".-.-/..|..",
	".|....-|.\\",
	"..//.|....",
];

describe("day 16", () => {
	describe("part 1", () => {
		it("should return the correct sample value", async () => {
			expect(await run1(sample)).toBe(46);
		});

		it("should return the correct value", async () => {
			expect(await run1(input)).toBe(8551);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", async () => {
			expect(await run2(sample)).toBe(51);
		});

		it("should return the correct value", async () => {
			expect(await run2(input)).toBe(8754);
		});
	});
});
