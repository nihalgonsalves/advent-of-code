import * as R from "ramda";

type Coord = { y: number; x: number };
type Direction = "^" | "v" | "<" | ">";
type Cell = "O" | "#" | "@" | ".";

const parseInput = (
	input: string,
): { robot: Coord; grid: Cell[][]; directions: Direction[] } => {
	const [gridStr, directionsStr] = input.split("\n\n");

	let robot: Coord | undefined;

	const grid = gridStr.split("\n").map((row, y) =>
		row.split("").map((value, x) => {
			if (value === "@") {
				robot = { y, x };
			}
			return value as Cell;
		}),
	);

	const directions = directionsStr
		.replaceAll("\n", "")
		.split("")
		.map((value) => value as Direction);

	if (!robot) {
		throw new Error("Robot not found");
	}

	return { robot, grid, directions };
};

const next = ({ y, x }: Coord, direction: Direction): Coord => {
	switch (direction) {
		case "<":
			return { y, x: x - 1 };
		case ">":
			return { y, x: x + 1 };
		case "^":
			return { y: y - 1, x };
		case "v":
			return { y: y + 1, x };
	}
};

const prev = ({ y, x }: Coord, direction: Direction): Coord => {
	switch (direction) {
		case "<":
			return { y, x: x + 1 };
		case ">":
			return { y, x: x - 1 };
		case "^":
			return { y: y + 1, x };
		case "v":
			return { y: y - 1, x };
	}
};

class Grid {
	constructor(public grid: Cell[][]) {}

	at({ y, x }: Coord): Cell {
		return this.grid[y][x];
	}

	set({ y, x }: Coord, value: Cell) {
		this.grid[y][x] = value;
	}

	print = () => {
		if (!process.env.PRINT) {
			return;
		}

		console.log(this.grid.map((row) => row.join("")).join("\n"));
		console.log();
	};
}

const push = (coord: Coord, grid: Grid, direction: Direction): boolean => {
	const nextCoord = next(coord, direction);
	const nextValue = grid.at(nextCoord);

	if (nextValue === "#") {
		return false;
	}

	if (nextValue === ".") {
		grid.set(nextCoord, grid.at(coord));
		grid.set(coord, grid.at(prev(coord, direction)));

		return true;
	}

	// nextValue === "O"
	return push(nextCoord, grid, direction);
};

export const move = (coord: Coord, grid: Grid, direction: Direction): Coord => {
	const nextCoord = next(coord, direction);
	const nextValue = grid.at(nextCoord);

	if (nextValue === "#") {
		return coord;
	}

	if (nextValue === ".") {
		grid.set(nextCoord, "@");
		grid.set(coord, ".");
		return nextCoord;
	}

	// if (nextValue === "O")
	if (push(coord, grid, direction)) {
		grid.set(nextCoord, "@");
		grid.set(coord, ".");
		return nextCoord;
	}

	return coord;
};

export const run1 = (inputStr: string): number => {
	const input = parseInput(inputStr);
	const grid = new Grid(input.grid);
	grid.print();

	for (const direction of input.directions) {
		if (process.env.PRINT) {
			console.log(`Move: ${direction}`);
		}

		input.robot = move(input.robot, grid, direction);
		grid.print();
	}

	const scores = grid.grid.flatMap((row, y) =>
		row.map((cell, x) => (cell === "O" ? 100 * y + x : 0)),
	);

	return R.sum(scores);
};

export const run2 = (input: string): number => {
	return 0;
};
