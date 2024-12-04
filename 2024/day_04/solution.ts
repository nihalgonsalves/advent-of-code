import * as R from "ramda";

type Coordinate = { x: number; y: number };
type Cell = Coordinate & { value: "X" | "M" | "A" | "S" };

enum Direction {
	N = "N",
	NE = "NE",
	E = "E",
	SE = "SE",
	S = "S",
	SW = "SW",
	W = "W",
	NW = "NW",
}

const cardinals = [Direction.N, Direction.E, Direction.S, Direction.W];
const diagonals = [Direction.NE, Direction.SE, Direction.SW, Direction.NW];

const NEXT_VALUE = {
	X: "M",
	M: "A",
	A: "S",
	S: undefined,
} as const;

const coordKey = ({ x, y }: Coordinate) => `${x},${y}`;
class WordGrid {
	data: Cell[][];

	constructor(input: string[]) {
		this.data = input.map((line, rowIndex) =>
			line.split("").map((value, colIndex) => ({
				x: rowIndex,
				y: colIndex,
				value: value as "X" | "M" | "A" | "S",
			})),
		);
	}

	solveXMAS(): Cell[][] {
		return this.data
			.flat()
			.filter((cell) => cell.value === "X")
			.flatMap((cell) =>
				this.getNeighbours([...cardinals, ...diagonals], cell)
					.filter(
						({ cell: neighbour }) => neighbour.value === NEXT_VALUE[cell.value],
					)
					.flatMap(({ cell: neighbour, direction }) =>
						this.getPath([cell, neighbour], direction),
					),
			);
	}

	solveX_MAS(): number {
		const allMASPaths = this.data
			.flat()
			.filter((cell) => cell.value === "M")
			.flatMap((cell) =>
				this.getNeighbours(diagonals, cell)
					.filter(
						({ cell: neighbour }) => neighbour.value === NEXT_VALUE[cell.value],
					)
					.flatMap(({ cell: neighbour, direction }) =>
						this.getPath([cell, neighbour], direction),
					),
			);

		const letterACounts = R.countBy(
			coordKey,
			allMASPaths.flat().filter((cell) => cell.value === "A"),
		);

		return Object.entries(letterACounts).filter(([_, count]) => count === 2)
			.length;
	}

	private getPath(path: Cell[], direction: Direction): Cell[][] {
		const last = path.at(-1)!;
		const expectedNextValue = NEXT_VALUE[last.value];

		if (!expectedNextValue) {
			return [path];
		}

		const nextValue = this.getNeighbour(last, direction);

		if (nextValue?.value === expectedNextValue) {
			return this.getPath([...path, nextValue], direction);
		}

		return [];
	}

	private getNeighbours(
		directions: Direction[],
		coordinate: Coordinate,
	): { direction: Direction; cell: Cell }[] {
		return directions
			.map((direction) => {
				const cell = this.getNeighbour(coordinate, direction);
				return cell ? { cell, direction } : undefined;
			})
			.filter((neighbour) => neighbour !== undefined);
	}

	private getNeighbour(
		coordinate: Coordinate,
		direction: Direction,
	): Cell | undefined {
		switch (direction) {
			case Direction.N:
				return this.data[coordinate.x - 1]?.[coordinate.y];
			case Direction.NE:
				return this.data[coordinate.x - 1]?.[coordinate.y + 1];
			case Direction.E:
				return this.data[coordinate.x]?.[coordinate.y + 1];
			case Direction.SE:
				return this.data[coordinate.x + 1]?.[coordinate.y + 1];
			case Direction.S:
				return this.data[coordinate.x + 1]?.[coordinate.y];
			case Direction.SW:
				return this.data[coordinate.x + 1]?.[coordinate.y - 1];
			case Direction.W:
				return this.data[coordinate.x]?.[coordinate.y - 1];
			case Direction.NW:
				return this.data[coordinate.x - 1]?.[coordinate.y - 1];
		}
	}
}

export const run1 = (input: string[]): number => {
	const grid = new WordGrid(input);
	const paths = grid.solveXMAS();
	return paths.length;
};

export const run2 = (input: string[]): number => {
	const grid = new WordGrid(input);
	return grid.solveX_MAS();
};
