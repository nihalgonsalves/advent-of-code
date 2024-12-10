import * as R from "ramda";

type Coordinate = { x: number; y: number };
type Cell = Coordinate & { value: number };
const coordKey = ({ x, y }: Coordinate) => `${x},${y}` as const;

class Trail {
	grid: Cell[][];
	trailheads: Cell[] = [];

	constructor(input: string[]) {
		this.grid = input.map((line, y) =>
			line.split("").map((value, x) => {
				const cell = { x, y, value: Number.parseInt(value, 10) };
				if (cell.value === 0) {
					this.trailheads.push(cell);
				}
				return cell;
			}),
		);
	}

	solve() {
		return R.sum(
			this.trailheads.map(
				(trailhead) => R.uniqBy(coordKey, this.traverse(trailhead)).length,
			),
		);
	}

	traverse(cell: Cell): Cell[] {
		if (cell.value === 9) {
			return [cell];
		}

		return this.neighbours(cell)
			.filter((neighbour) => neighbour.value === cell.value + 1)
			.flatMap((cell) => this.traverse(cell));
	}

	neighbours(cell: Cell): Cell[] {
		return [
			this.grid[cell.y]?.[cell.x - 1], // left
			this.grid[cell.y]?.[cell.x + 1], // right
			this.grid[cell.y - 1]?.[cell.x], // top
			this.grid[cell.y + 1]?.[cell.x], // bottom
		].filter((cell) => cell !== undefined);
	}
}

export const run1 = (input: string[]): number => {
	const trail = new Trail(input);

	return trail.solve();
};

export const run2 = (input: string[]): number => {
	return 0;
};
