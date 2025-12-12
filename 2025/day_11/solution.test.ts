import { describe, expect, it } from "bun:test";
import { getInputLines } from "../../getInputLines";
import { run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

describe("day 11", () => {
	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(
				run1([
					"aaa: you hhh",
					"you: bbb ccc",
					"bbb: ddd eee",
					"ccc: ddd eee fff",
					"ddd: ggg",
					"eee: out",
					"fff: out",
					"ggg: out",
					"hhh: ccc fff iii",
					"iii: out",
				]),
			).toBe(5);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(640);
		});
	});

	describe.skip("part 2", () => {
		it("should return the correct sample value", () => {
			expect(
				run2([
					"svr: aaa bbb",
					"aaa: fft",
					"fft: ccc",
					"bbb: tty",
					"tty: ccc",
					"ccc: ddd eee",
					"ddd: hub",
					"hub: fff",
					"eee: dac",
					"dac: fff",
					"fff: ggg hhh",
					"ggg: out",
					"hhh: out",
				]),
			).toBe(2);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(0);
		});
	});
});
