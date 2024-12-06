import { styleText } from "node:util";

enum Direction {
	Up = "Up",
	Down = "Down",
	Left = "Left",
	Right = "Right",
}

type Coordinate = { x: number; y: number };
type Cell = Coordinate & { value: "#" | "." };

const nextPositionRight = {
	[Direction.Up]: Direction.Right,
	[Direction.Right]: Direction.Down,
	[Direction.Down]: Direction.Left,
	[Direction.Left]: Direction.Up,
} as const;

const coordKey = ({ x, y }: Coordinate) => `${x},${y}`;

class GuardGrid {
	grid: Cell[][];
	guardPosition!: Coordinate;
	guardDirection!: Direction;
	visited = new Set<string>();
	moveCount = 0;

	constructor(
		input: string[],
		private maxMoves = Number.POSITIVE_INFINITY,
	) {
		this.grid = input.map((line, x) =>
			line.split("").map((value, y) => {
				if (value === "^") {
					this.guardPosition = { x, y };
					this.visited.add(coordKey(this.guardPosition));
					this.guardDirection = Direction.Up;

					return { x, y, value: "." as const };
				}

				return { x, y, value: value as Cell["value"] };
			}),
		);

		if (!this.guardPosition) {
			throw new Error("No startCoord found");
		}
	}

	move() {
		if (this.moveCount > this.maxMoves) {
			throw new Error("Loop detected");
		}

		const next = this.coordInFrontOfGuard();
		if (!next) {
			return;
		}

		if (next.value === "#") {
			this.guardDirection = nextPositionRight[this.guardDirection];
		} else {
			this.guardPosition = next;
			this.moveCount++;
			this.visited.add(coordKey(next));
		}

		this.move();
	}

	printGrid() {
		for (const row of this.grid) {
			for (const cell of row) {
				if (this.visited.has(coordKey(cell))) {
					process.stdout.write(styleText("bgGreen", cell.value));
				} else {
					process.stdout.write(cell.value);
				}
			}
			process.stdout.write("\n");
		}
	}

	private coordInFrontOfGuard(): Cell | undefined {
		const { x, y } = this.guardPosition;

		switch (this.guardDirection) {
			case Direction.Up:
				return this.grid[x - 1]?.[y];
			case Direction.Down:
				return this.grid[x + 1]?.[y];
			case Direction.Left:
				return this.grid[x]?.[y - 1];
			case Direction.Right:
				return this.grid[x]?.[y + 1];
		}
	}
}

export const run1 = (input: string[]): number => {
	const guardGrid = new GuardGrid(input);
	guardGrid.move();

	if (process.env.PRINT) {
		guardGrid.printGrid();
	}

	return guardGrid.visited.size;
};

export const run2 = (input: string[]): number => {
	const guardGrid = new GuardGrid(input);
	guardGrid.move();

	return guardGrid.grid
		.flatMap((row) =>
			row
				.map((cell) => {
					if (guardGrid.visited.has(coordKey(cell))) {
						const newGrid = new GuardGrid(input, 10000);
						newGrid.grid[cell.x][cell.y].value = "#";
						return newGrid;
					}

					return undefined;
				})
				.filter((grid) => grid !== undefined),
		)
		.filter((grid) => {
			try {
				grid.move();
				return false;
			} catch {
				return true;
			}
		}).length;
};
