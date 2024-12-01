import * as R from "ramda";

type DirectionStr = "R" | "D" | "L" | "U";

enum Direction {
	R = 0,
	D = 1,
	L = 2,
	U = 3,
}

type DigInstruction = { direction: Direction | DirectionStr; count: number };

const parseInput1 = (input: string[]): DigInstruction[] =>
	input.map((line) => {
		const [direction, count, color] = line.split(" ");

		return {
			count: parseInt(count, 10),
			direction: direction as DirectionStr,
		};
	});

const parseInput2 = (input: string[]): DigInstruction[] =>
	input.map((line) => {
		const [_wrongDirection, _wrongCount, hex] = line.split(" ");

		// hex:   (#000000)
		// index: 012345678

		return {
			count: parseInt(hex.slice(2, 7), 16),
			direction: parseInt(hex.slice(7, 8), 10) as Direction,
		};
	});

type Coords = [i: number, j: number];

const getNextCursors = (
	direction: Direction | DirectionStr,
	count: number,
	[i, j]: Coords,
): Coords => {
	switch (direction) {
		case "U":
		case Direction.U:
			return [i - count, j];
		case "D":
		case Direction.D:
			return [i + count, j];
		case "L":
		case Direction.L:
			return [i, j - count];
		case "R":
		case Direction.R:
			return [i, j + count];
	}
};

const getBorderVertices = (instructions: DigInstruction[]) => {
	let i = 0;
	let j = 0;

	const vertices: Coords[] = [];

	for (const { direction, count } of instructions) {
		[i, j] = getNextCursors(direction, count, [i, j]);
		vertices.push([i, j]);
	}

	return vertices;
};

export const shoelace = (vertices: Coords[]): number => {
	const pairsWithLast = R.aperture(2, [...vertices, vertices[0]]);

	const sum = pairsWithLast.reduce(
		(acc, [[xA, yA], [xB, yB]]) => acc + (xA * yB - xB * yA),
		0,
	);

	return Math.abs(sum) / 2;
};

const calc = (instructions: DigInstruction[]) => {
	const vertices = getBorderVertices(instructions);
	const borderLength = instructions.reduce((acc, { count }) => acc + count, 0);

	return shoelace(vertices) + borderLength / 2 + 1;
};

export const run1 = (input: string[]): number => calc(parseInput1(input));

export const run2 = (input: string[]): number => calc(parseInput2(input));
