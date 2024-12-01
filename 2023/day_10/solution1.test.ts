import { describe, it, expect, test } from "bun:test";

import { mapInput, run1 } from "./solution1";
import {
	guessConnectorType,
	getAdjacentItems,
	tupleGridToGrid,
} from "./common";
import { getInputLines } from "../../getInputLines";

const input = await getInputLines(import.meta.url);

describe("day 10 > part 1", () => {
	const smallInput = [
		//           0 1 2
		"S-7", // 0  ╳ ━ ┓
		"|.|", // 1  ┃ . ┃
		"L-J", // 2  ┗ ━ ┛
	];

	test("mapInput returns grid and startingPoint", () => {
		const { grid, startingGridItem } = mapInput(smallInput);

		expect(startingGridItem).toMatchObject({ row: 0, col: 0 });

		expect(grid).toMatchObject(
			tupleGridToGrid([
				["┏", "━", "┓"],
				["┃", ".", "┃"],
				["┗", "━", "┛"],
			]),
		);
	});

	test("getAdjacentItems returns adjacent items", () => {
		const { grid } = mapInput(smallInput);
		const adjacentItems = getAdjacentItems({
			grid,
			gridItem: { row: 1, col: 1 },
		});

		expect(adjacentItems).toMatchObject({
			north: { row: 0, col: 1, value: "━" },
			east: { row: 1, col: 2, value: "┃" },
			south: { row: 2, col: 1, value: "━" },
			west: { row: 1, col: 0, value: "┃" },
		});
	});

	it.each(
		// prettier-ignore
		[
			[0, 0, "┏"],
			[0, 2, "┓"],
			[2, 0, "┗"],
			[2, 2, "┛"],
		] as const,
	)(
		"guessConnectorType returns the correct connector at row=%d, col=%d for %s",
		(row, col, connector) => {
			const { grid } = mapInput(smallInput);

			expect(guessConnectorType({ grid, startingCoords: { row, col } })).toBe(
				connector,
			);
		},
	);

	const sample1: string[] = [
		// break
		".....", // .....
		".S-7.", // .┏━┓.
		".|.|.", // .┃.┃.
		".L-J.", // .┗━┛.
		".....", // .....
	];

	const sample2: string[] = [
		// break
		"..F7.",
		".FJ|.",
		"SJ.L7",
		"|F--J",
		"LJ...",
	];

	const print = process.env.PRINT != null;

	it("should return the correct sample1 value", () => {
		expect(run1(sample1, print)).toBe(4);
	});

	it("should return the correct sample2 value", () => {
		expect(run1(sample2, print)).toBe(8);
	});

	it("should return the correct value", () => {
		expect(run1(input, print)).toBe(7102);
	});
});
