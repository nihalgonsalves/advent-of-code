import FastPriorityQueue from "fastpriorityqueue";

type Coords = { i: number; j: number };
type Cell = Coords & { cost: number };

const parseInput = (input: string[]): Cell[][] =>
	input.map((line, i) =>
		line
			.split("")
			.map((char, j) => ({ i, j, cost: Number.parseInt(char, 10) })),
	);

type Direction = "north" | "east" | "south" | "west";

type Cursor = Cell & {
	direction: Direction;
	path: Coords[];
	forwardMovementCount: number;
};

const makeCursor = (
	prev: Cursor,
	cell: Cell | undefined,
	direction: Direction,
	forwardMovementCount = 1,
): Cursor | undefined =>
	cell
		? {
				...cell,
				path: [...prev.path, { i: cell.i, j: cell.j }],
				cost: prev.cost + cell.cost,
				direction,
				forwardMovementCount,
			}
		: undefined;

const getLeftRightNeighbours = (
	cursor: Cursor,
	matrix: Cell[][],
): (Cursor | undefined)[] => {
	const { direction, i, j } = cursor;

	switch (direction) {
		case "north":
		case "south":
			return [
				makeCursor(cursor, matrix[i]?.[j - 1], "west"),
				makeCursor(cursor, matrix[i]?.[j + 1], "east"),
			];
		case "east":
		case "west":
			return [
				makeCursor(cursor, matrix[i - 1]?.[j], "north"),
				makeCursor(cursor, matrix[i + 1]?.[j], "south"),
			];
	}
};

const getForwardCursor = (
	cursor: Cursor,
	matrix: Cell[][],
): Cursor | undefined => {
	const { direction, i, j, forwardMovementCount } = cursor;

	switch (direction) {
		case "north":
			return makeCursor(
				cursor,
				matrix[i - 1]?.[j],
				direction,
				forwardMovementCount + 1,
			);
		case "east":
			return makeCursor(
				cursor,
				matrix[i]?.[j + 1],
				direction,
				forwardMovementCount + 1,
			);
		case "south":
			return makeCursor(
				cursor,
				matrix[i + 1]?.[j],
				direction,
				forwardMovementCount + 1,
			);
		case "west":
			return makeCursor(
				cursor,
				matrix[i]?.[j - 1],
				direction,
				forwardMovementCount + 1,
			);
	}
};

const filterUndefined = <T>(val: T): val is NonNullable<typeof val> =>
	val !== undefined;

const neighbours = (
	cursor: Cursor,
	matrix: Cell[][],
	minForward: number,
	maxForward: number,
): Cursor[] => {
	const forwardCursor = getForwardCursor(cursor, matrix);

	if (cursor.forwardMovementCount < minForward) {
		return forwardCursor ? [forwardCursor] : [];
	}

	return [forwardCursor, ...getLeftRightNeighbours(cursor, matrix)]
		.filter(filterUndefined)
		.filter(({ forwardMovementCount }) => forwardMovementCount <= maxForward);
};

const run = (matrix: Cell[][], minForward: number, maxForward: number) => {
	const start: Cursor = {
		...matrix[0][0],
		path: [],
		direction: "east",
		forwardMovementCount: 1,
		cost: 0,
	};

	const goalI = matrix.length - 1;
	const goalJ = matrix[0].length - 1;

	const openSet = new FastPriorityQueue<Cursor>((a, b) => a.cost < b.cost);
	openSet.add(start);

	const cursorKey = ({ i, j, direction, forwardMovementCount }: Cursor) =>
		JSON.stringify({ i, j, direction, forwardMovementCount });

	const gScore = new Map<string, number>();
	gScore.set(cursorKey(start), start.cost);

	while (!openSet.isEmpty()) {
		const current = openSet.poll()!;

		if (
			current.i === goalI &&
			current.j === goalJ &&
			minForward <= current.forwardMovementCount &&
			current.forwardMovementCount <= maxForward
		) {
			return current.cost;
		}

		for (const next of neighbours(current, matrix, minForward, maxForward)) {
			const tentativeGScore = next.cost;
			if (
				tentativeGScore <
				(gScore.get(cursorKey(next)) ?? Number.POSITIVE_INFINITY)
			) {
				gScore.set(cursorKey(next), tentativeGScore);
				openSet.add(next);
			}
		}
	}

	throw new Error("No path found");
};

export const run1 = (input: string[]): number => {
	const matrix = parseInput(input);

	return run(matrix, 1, 3);
};

export const run2 = (input: string[]): number => {
	const matrix = parseInput(input);

	return run(matrix, 4, 10);
};
