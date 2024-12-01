import { describe, it, expect } from "bun:test";

import { run1, run2 } from "./solution";
import { getInputLines } from "../../getInputLines";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	"rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7",
];

describe("day 15", () => {
	describe("part 1", () => {
		it("should return the correct value for HASH", () => {
			expect(run1(["HASH"])).toBe(52);
		});

		it("should return the correct sample value", () => {
			expect(run1(sample)).toBe(1320);
		});

		it("should return the correct value", () => {
			expect(run1(input)).toBe(511343);
		});
	});

	describe("part 2", () => {
		it.todo("should return the correct sample value", () => {
			expect(run2(sample)).toBe(145);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(0);
		});
	});
});
