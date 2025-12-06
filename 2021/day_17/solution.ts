import assert from "node:assert";
import * as R from "ramda";

import { getInputLines } from "../../getInputLines";

const [rawInput] = await getInputLines(import.meta.url);

const parseRegEx =
	/^target area: x=(?<x1>-?\d*)\.\.(?<x2>-?\d*), y=(?<y1>-?\d*)\.\.(?<y2>-?\d*)$/;

const groups = rawInput.match(parseRegEx)!.groups!;

const range: Record<"x" | "y", [number, number]> = {
	x: [Number.parseInt(groups.x1, 10), Number.parseInt(groups.x2, 10)],
	y: [Number.parseInt(groups.y1, 10), Number.parseInt(groups.y2, 10)],
};

const maxX = Math.max(...range.x);
const minY = Math.min(...range.y);

const inRange = (val: number, range: [number, number]) =>
	range[0] <= val && val <= range[1];

const simulate = (vx: number, vy: number): number | undefined => {
	const probe = {
		x: 0,
		y: 0,
		vx,
		vy,
	};

	let maxY = 0;

	const tick = () => {
		probe.x += probe.vx;
		probe.y += probe.vy;

		if (probe.vx > 0) {
			probe.vx -= 1;
		} else if (probe.vx < 0) {
			probe.vx += 1;
		}
		probe.vy -= 1;
	};

	let reachedTarget = false;

	while (!reachedTarget && probe.x < maxX && minY < probe.y) {
		tick();

		if (probe.y > maxY) {
			maxY = probe.y;
		}

		if (
			!reachedTarget &&
			inRange(probe.x, range.x) &&
			inRange(probe.y, range.y)
		) {
			reachedTarget = true;
		}
	}

	if (reachedTarget) {
		return maxY;
	}
};

const permutations = R.range(1, maxX + 1).flatMap((vx) =>
	R.range(minY, Math.abs(minY) + 1).map((vy) => ({ vx, vy })),
);

const simulations = permutations.map(({ vx, vy }) => ({
	vx,
	vy,
	maxY: simulate(vx, vy),
}));

const possibleSimulations = R.filter(
	(s): s is typeof s & { maxY: number } => s.maxY !== undefined,
	simulations,
);

// Part 1

const { maxY } = R.sortBy(R.prop("maxY"), possibleSimulations).at(-1)!;

// Part 2

const possibleSimulationsCount = possibleSimulations.length;

// Solution

assert.strictEqual(maxY, 10585);
assert.strictEqual(possibleSimulationsCount, 5247);
