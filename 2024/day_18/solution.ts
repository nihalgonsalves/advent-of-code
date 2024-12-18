import { styleText } from "node:util";
import * as R from "ramda";

type Coord = { y: number; x: number };
type Cell = Coord & { safe: boolean };

const coordKey = ({ y, x }: Coord) => `${y},${x}`;
type CoordKey = ReturnType<typeof coordKey>;

type ScoredCell = Coord & {
	f: number;
	g: number;
	h: number;
	parent?: ScoredCell;
};

const parseInput = (input: string[]): Coord[] =>
	input.map((line) => {
		const [x, y] = line.split(",").map(Number);

		return { x, y };
	});

const findPaths = (
	grid: Cell[][],
	source: Coord,
	destination: Coord,
): ScoredCell => {
	const visited = new Set<CoordKey>();

	const getNeighbours = ({ x, y }: Coord): Cell[] =>
		[
			grid[y - 1]?.[x],
			grid[y]?.[x + 1],
			grid[y + 1]?.[x],
			grid[y]?.[x - 1],
		].filter((v) => v?.safe && !visited.has(coordKey(v)));

	const calcH = ({ x, y }: Coord) =>
		Math.abs(x - destination.x) + Math.abs(y - destination.y);

	let openNodes: ScoredCell[] = [{ ...source, f: 0, g: 0, h: calcH(source) }];

	while (openNodes.length !== 0) {
		const [currentNode, ...nextOpenNodes] = R.sortBy(R.prop("f"), openNodes);

		openNodes = nextOpenNodes;
		visited.add(coordKey(currentNode));

		if (coordKey(currentNode) === coordKey(destination)) {
			return currentNode;
		}

		for (const node of getNeighbours(currentNode)) {
			const g = currentNode.g + 1;
			const h = calcH(node);

			const scoredNode = {
				...node,
				g,
				h,
				f: g + h,
				parent: currentNode,
			};

			const existingOpenNode = openNodes.find(
				(openNode) => coordKey(openNode) === coordKey(node),
			);

			if (!existingOpenNode || scoredNode.g < existingOpenNode.g) {
				openNodes.push(scoredNode);
			}
		}
	}

	throw new Error("No path found");
};

const getSolution = (node: ScoredCell): ScoredCell[] => {
	let cursor: ScoredCell | undefined = node;

	const path: ScoredCell[] = [];

	while (cursor) {
		path.push(cursor);
		cursor = cursor.parent;
	}

	path.reverse();

	return path;
};

const printGrid = (grid: Cell[][], path: Set<CoordKey>) => {
	if (!process.env.PRINT) {
		return;
	}

	for (const row of grid) {
		console.log(
			row
				.map((cell) => {
					if (!cell.safe) {
						return "#";
					}

					if (path.has(coordKey(cell))) {
						return styleText("bgGreen", "O");
					}

					return ".";
				})
				.join(""),
		);
	}
};

const getSolutionAfterBytes = (
	incoming: Coord[],
	maxY: number,
	maxX: number,
	bytes: number,
) => {
	const grid = Array.from({ length: maxY + 1 }).map((_, y) =>
		Array.from({ length: maxX + 1 }).map(
			(_, x): Cell => ({ y, x, safe: true }),
		),
	);

	for (const { x, y } of incoming.slice(0, bytes)) {
		grid[y][x].safe = false;
	}

	return {
		grid,
		solutionCell: findPaths(grid, { x: 0, y: 0 }, { x: maxX, y: maxY }),
	};
};

export const run1 = (
	input: string[],
	maxY: number,
	maxX: number,
	bytes: number,
): number => {
	const incoming = parseInput(input);
	const { grid, solutionCell } = getSolutionAfterBytes(
		incoming,
		maxY,
		maxX,
		bytes,
	);

	const paths = getSolution(solutionCell);
	printGrid(grid, new Set(paths.map((path) => coordKey(path))));

	return paths.length - 1;
};

export const run2 = (
	input: string[],
	maxY: number,
	maxX: number,
	minBytes = 1,
): Coord => {
	const incoming = parseInput(input);

	for (let i = minBytes; ; i++) {
		try {
			getSolutionAfterBytes(incoming, maxY, maxX, i);
		} catch {
			return incoming[i - 1];
		}
	}
};
