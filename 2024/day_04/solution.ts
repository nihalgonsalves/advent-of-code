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

const DIRECTIONS = [
	Direction.N,
	Direction.NE,
	Direction.E,
	Direction.SE,
	Direction.S,
	Direction.SW,
	Direction.W,
	Direction.NW,
];

const NEXT_VALUE = {
	X: "M",
	M: "A",
	A: "S",
	S: undefined,
} as const;

class WordGrid {
	data: Cell[][];
	private letterXCells: Cell[] = [];

	constructor(input: string[]) {
		this.data = input.map((line, rowIndex) =>
			line.split("").map((value, colIndex) => {
				const cell = {
					x: rowIndex,
					y: colIndex,
					value: value as "X" | "M" | "A" | "S",
				};

				if (value === "X") {
					this.letterXCells.push(cell);
				}

				return cell;
			}),
		);
	}

	solve(): Cell[][] {
		const paths = this.letterXCells.flatMap((cell) =>
			this.getNeighbours(cell)
				.filter(
					({ cell: neighbour }) => neighbour.value === NEXT_VALUE[cell.value],
				)
				.flatMap(({ cell, direction }) => {
					return this.getPath([cell], direction);
				}),
		);

		return paths;
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
		coordinate: Coordinate,
	): { direction: Direction; cell: Cell }[] {
		return DIRECTIONS.map((direction) => {
			const cell = this.getNeighbour(coordinate, direction);
			return cell ? { cell, direction } : undefined;
		}).filter((neighbour) => neighbour !== undefined);
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
	const paths = grid.solve();
	return paths.length;
};

export const run2 = (input: string[]): number => {
	return 0;
};
