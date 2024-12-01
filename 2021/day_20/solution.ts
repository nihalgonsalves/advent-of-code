import assert from "assert";
import * as R from "ramda";

import { getInputLines } from "../../getInputLines";

const [lookup, ...image] = (await getInputLines(import.meta.url)).map((line) =>
	line.split("").map((char) => (char === "#" ? 1 : 0)),
);

type Image = (0 | 1)[][];
type Grid = { image: Image; outside: 0 | 1 };

const createArray = <T>(el: T, length: number): T[] =>
	R.times(R.always(el), length);

const padImage = (image: Image, padChar: 0 | 1): Image => {
	const padAmount = 2;

	const row = createArray(padChar, image[0].length + padAmount * 2);

	return [
		...createArray(row, padAmount),
		...image.map((row) => [
			...createArray(padChar, padAmount),
			...row,
			...createArray(padChar, padAmount),
		]),
		...createArray(row, padAmount),
	];
};

const enhanceImage = ({ image, outside }: Grid): Grid => {
	const nextOutside = outside === 0 ? 1 : 0;

	const padded = padImage(image, outside);
	const m = padded.length;
	const n = padded[0].length;

	const enhanced = Array.from({ length: m }, (_, x) =>
		Array.from({ length: n }, (_, y) => {
			const sourcePixels = R.xprod([x - 1, x, x + 1], [y - 1, y, y + 1]).map(
				([x, y]) => padded[x]?.[y],
			);

			if (sourcePixels.some((p) => p === undefined)) {
				return nextOutside;
			}

			const sourceBinary = parseInt(sourcePixels.join(""), 2);

			return lookup[sourceBinary];
		}),
	);

	return { image: enhanced, outside: nextOutside };
};

let grid: Grid = { image, outside: 0 };

const enhance = () => {
	grid = enhanceImage(grid);
};

// Part 1

R.times(enhance, 2);
const litPixelsAfter2Runs = R.sum(grid.image.flat());

// Part 2

R.times(enhance, 48);
const litPixelsAfter50Runs = R.sum(grid.image.flat());

// Solution

assert.strictEqual(litPixelsAfter2Runs, 5306);
assert.strictEqual(litPixelsAfter50Runs, 17497);

console.log({ litPixelsAfter2Runs, litPixelsAfter50Runs });
