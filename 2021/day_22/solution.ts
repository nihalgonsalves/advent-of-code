import assert from "node:assert";
import * as R from "ramda";

import { getInputLines, time } from "../../getInputLines";

const matcher =
	/^(?<action>on|off) x=(?<x1>-?\d*)\.\.(?<x2>-?\d*),y=(?<y1>-?\d*)\.\.(?<y2>-?\d*),z=(?<z1>-?\d*)\.\.(?<z2>-?\d*)$/;

const parseIntObj = <T extends string>(obj: Record<T, string>) =>
	R.mapObjIndexed((val) => Number.parseInt(val, 10), obj);

const input = (await getInputLines(import.meta.url)).map((line) => {
	const { action, ...rawCoords } = line.match(matcher)!.groups!;

	return {
		action: action as "on" | "off",
		coords: parseIntObj(
			rawCoords as Record<"x1" | "x2" | "y1" | "y2" | "z1" | "z2", string>,
		),
	};
});

const minVal = input
	.flatMap(({ coords }) => Object.values(coords))
	.reduce((val, min) => Math.min(val, min), Number.POSITIVE_INFINITY);

const shift = R.add(Math.abs(minVal));

// To use only positive indices
const shiftedInput = input.map(({ action, coords }) => ({
	action,
	coords: R.mapObjIndexed(shift, coords),
}));

const inclusiveRange = (a: number, b: number) =>
	a < b ? R.range(a, b + 1) : R.reverse(R.range(b, a + 1));

const initArea = [shift(-50), shift(50)] as const;
const withinInitArea = R.clamp(...initArea);

const isLeft = (n: number) => n < initArea[0];
const isRight = (n: number) => initArea[1] < n;

const both = (fn: (n: number) => boolean, a: number, b: number) =>
	fn(a) && fn(b);

const rangeWithinInitArea = (a: number, b: number) => {
	if (both(isLeft, a, b) || both(isRight, a, b)) {
		return [];
	}

	const clampedA = withinInitArea(a);
	const clampedB = withinInitArea(b);

	return inclusiveRange(clampedA, clampedB);
};

const onValues = new Set<string>();

time("runtime", () => {
	shiftedInput.forEach(({ action, coords: { x1, x2, y1, y2, z1, z2 } }, i) => {
		rangeWithinInitArea(x1, x2).forEach((x) => {
			rangeWithinInitArea(y1, y2).forEach((y) => {
				rangeWithinInitArea(z1, z2).forEach((z) => {
					const coordID = `${x}_${y}_${z}`;
					if (action === "on") {
						onValues.add(coordID);
					} else {
						onValues.delete(coordID);
					}
				});
			});
		});
	});
});

assert.strictEqual(onValues.size, 596989);

console.log({ onCubes: onValues.size });
