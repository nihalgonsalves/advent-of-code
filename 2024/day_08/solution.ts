import { isDeepStrictEqual } from "node:util";
import * as R from "ramda";

type Coordinate = { x: number; y: number };
type Cell = Coordinate & { value: string };

const coordKey = ({ x, y }: Coordinate): `${number},${number}` => `${x},${y}`;
type CoordKey = ReturnType<typeof coordKey>;

const parseInput = (input: string[]): Cell[][] =>
	input.map((line, x) => line.split("").map((value, y) => ({ x, y, value })));

export const run1 = (input: string[]): number => {
	const grid = parseInput(input);
	const byFrequency = R.groupBy(
		(cell: Cell) => cell.value,
		grid.flat().filter((cell) => cell.value !== "."),
	);

	const antinodes = new Set<CoordKey>();

	for (const [, cells] of Object.entries(byFrequency)) {
		for (const [a, b] of R.xprod(cells!, cells!)) {
			if (coordKey(a) === coordKey(b)) {
				continue;
			}

			const xOffset = a.x - b.x;
			const yOffset = a.y - b.y;

			for (const antinode of [
				grid[a.x + xOffset]?.[a.y + yOffset],
				grid[b.x - xOffset]?.[b.y - yOffset],
			]) {
				if (antinode) {
					antinodes.add(coordKey(antinode));
				}
			}
		}
	}

	if (process.env.PRINT) {
		for (const line of grid) {
			for (const cell of line) {
				process.stdout.write(antinodes.has(coordKey(cell)) ? "#" : cell.value);
			}
			process.stdout.write("\n");
		}
	}

	return antinodes.size;
};

export const run2 = (input: string[]): number => {
	return 0;
};
