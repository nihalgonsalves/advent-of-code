import { describe, expect, it } from "bun:test";
import { getInputLines } from "../../getInputLines";
import { allPairs, run1, run2 } from "./solution";

const input = await getInputLines(import.meta.url);

const sample: string[] = [
	"162,817,812",
	"57,618,57",
	"906,360,560",
	"592,479,940",
	"352,342,300",
	"466,668,158",
	"542,29,236",
	"431,825,988",
	"739,650,466",
	"52,470,668",
	"216,146,977",
	"819,987,18",
	"117,168,530",
	"805,96,715",
	"346,949,466",
	"970,615,88",
	"941,993,340",
	"862,61,35",
	"984,92,344",
	"425,690,689",
];

describe("day 08", () => {
	describe("allPairs", () => {
		it("should return the correct pairs", () => {
			expect(allPairs(["x", "y", "z"])).toMatchObject([
				["x", "y"],
				["x", "z"],
				["y", "z"],
			]);
		});
	});

	describe("part 1", () => {
		it("should return the correct sample value", () => {
			expect(run1(sample, 10)).toBe(40);
		});

		it("should return the correct value", () => {
			expect(run1(input, 1000)).toBe(121770);
		});
	});

	describe("part 2", () => {
		it("should return the correct sample value", () => {
			expect(run2(sample)).toBe(25272);
		});

		it("should return the correct value", () => {
			expect(run2(input)).toBe(7893123992);
		});
	});
});
