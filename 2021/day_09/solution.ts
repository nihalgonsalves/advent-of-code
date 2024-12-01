import assert from "node:assert";
import * as R from "ramda";

import { getInputLines } from "../../getInputLines";

type Point = { x: number; y: number; value: number };

const data: Point[][] = (await getInputLines(import.meta.url)).map(
	(line, rowIndex) =>
		line.split("").map((s, colIndex) => ({
			x: rowIndex,
			y: colIndex,
			value: Number.parseInt(s, 10),
		})),
);

const getNeighbours = (
	x: number,
	y: number,
	predicate: (value: Point) => boolean = () => true,
) =>
	[
		data[x]?.[y - 1],
		data[x]?.[y + 1],
		data[x - 1]?.[y],
		data[x + 1]?.[y],
	].filter((val): val is Point => val !== undefined && predicate(val));

const getBasin = (point: Point, visited: boolean[][]): Point[] => {
	const basinNeighbours = getNeighbours(
		point.x,
		point.y,
		(p) => !visited[p.x][p.y] && p.value < 9,
	);

	basinNeighbours.forEach(({ x, y }) => {
		visited[x][y] = true;
	});

	return [point, ...basinNeighbours.flatMap((p) => getBasin(p, visited))];
};

let riskScore = 0;
const basinSizes: number[] = [];

data.forEach((row) => {
	row.forEach((cell) => {
		const neighbours = getNeighbours(cell.x, cell.y);

		if (neighbours.every(({ value }) => value > cell.value)) {
			riskScore += cell.value + 1;

			const visited = Array.from({ length: data.length }, () =>
				Array.from({ length: row.length }, () => false),
			);

			visited[cell.x][cell.y] = true;

			basinSizes.push(getBasin(cell, visited).length);
		}
	});
});

const biggestBasinsMultipledSize = R.pipe(
	() => basinSizes,
	R.sort((a, b) => b - a),
	R.take(3),
	R.reduce<number, number>(R.multiply, 1),
)();

// Solution

assert.strictEqual(riskScore, 591);
assert.strictEqual(biggestBasinsMultipledSize, 1113424);

console.log({ riskScore, biggestBasinsMultipledSize });
