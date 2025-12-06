import assert from "node:assert";
import * as R from "ramda";

import { getInputLines } from "../../getInputLines";

type Octopus = {
	energy: number;
	x: number;
	y: number;
	flashedThisCycle: boolean;
};

const lines = (await getInputLines(import.meta.url)).map((line, x) =>
	line.split("").map((energy, y) =>
		//
		({ energy: Number.parseInt(energy, 10), x, y, flashedThisCycle: false }),
	),
);

const getAdjacent = (x: number, y: number) =>
	R.xprod([x - 1, x, x + 1], [y - 1, y, y + 1])
		.map(([xi, yi]) => lines[xi]?.[yi])
		.filter((oct: Octopus) => oct && !(oct.x === x && oct.y === y));

const incrementEnergy = (oct: Octopus) => {
	oct.energy += 1;

	if (oct.energy > 9 && !oct.flashedThisCycle) {
		oct.flashedThisCycle = true;
		getAdjacent(oct.x, oct.y).forEach(incrementEnergy);
	}
};

let flashes = 0;
let flashesAfter100Steps: number | undefined;
let firstSync: number | undefined;

const octos = lines.flat();

for (let i = 1; firstSync === undefined; i += 1) {
	octos.forEach(incrementEnergy);

	const flashedOctos = octos.filter((oct) => oct.flashedThisCycle);

	for (const oct of flashedOctos) {
		flashes += 1;
		oct.energy = 0;
		oct.flashedThisCycle = false;
	}

	if (i === 100) {
		flashesAfter100Steps = flashes;
	}

	if (octos.length === flashedOctos.length) {
		firstSync = i;
	}
}

// Solution

assert.strictEqual(flashesAfter100Steps, 1721);
assert.strictEqual(firstSync, 298);
