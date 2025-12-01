import { styleText } from "node:util";
import * as R from "ramda";

type Coord = { y: number; x: number };
type Cell = Coord & { type: "start" | "end" | "wall" | "open" };

const coordKey = ({ y, x }: Coord) => `${y},${x}`;
type CoordKey = ReturnType<typeof coordKey>;

type Direction = "N" | "E" | "S" | "W";

type ScoredCell = Coord & {
	f: number;
	g: number;
	h: number;
	parent?: ScoredCell;
	direction: Direction;
};

const parseInput = (input: string[]) => {
	let start: Coord | undefined;
	let end: Coord | undefined;

	const grid = input.map((line, y) => {
		return line.split("").map((char, x): Cell => {
			const coord = { y, x };

			if (char === "S") {
				start = coord;
				return { ...coord, type: "start" };
			}

			if (char === "E") {
				end = coord;
				return { ...coord, type: "end" };
			}

			if (char === "#") {
				return { ...coord, type: "wall" };
			}

			return { ...coord, type: "open" };
		});
	});

	if (!start || !end) {
		throw new Error("Start or end not found");
	}

	return { grid, start, end };
};

const directionScore: Record<Direction, Record<Direction, number>> = {
	N: { N: 0, E: 1, S: 2, W: 1 },
	E: { N: 1, E: 0, S: 1, W: 2 },
	S: { N: 2, E: 1, S: 0, W: 1 },
	W: { N: 1, E: 2, S: 1, W: 0 },
};

const calcDirectionScore = (from: Direction, to: Direction) =>
	directionScore[from][to] * 1000;

const findPaths = (
	grid: Cell[][],
	source: Coord,
	destination: Coord,
): ScoredCell => {
	const visited = new Set<CoordKey>();

	const getNeighbours = ({
		x,
		y,
	}: Coord): { node: Cell; direction: Direction }[] =>
		[
			{ node: grid[y - 1]?.[x], direction: "N" as const },
			{ node: grid[y]?.[x + 1], direction: "E" as const },
			{ node: grid[y + 1]?.[x], direction: "S" as const },
			{ node: grid[y]?.[x - 1], direction: "W" as const },
		].filter(
			(v) =>
				v.node !== undefined &&
				v.node.type !== "wall" &&
				!visited.has(coordKey(v.node)),
		);

	const calcH = ({ x, y }: Coord) =>
		Math.abs(x - destination.x) + Math.abs(y - destination.y);

	let openNodes: ScoredCell[] = [
		{ ...source, f: 0, g: 0, h: calcH(source), direction: "E" },
	];

	while (openNodes.length !== 0) {
		const [currentNode, ...nextOpenNodes] = R.sortBy(R.prop("f"), openNodes);

		openNodes = nextOpenNodes;
		visited.add(coordKey(currentNode));

		if (coordKey(currentNode) === coordKey(destination)) {
			return currentNode;
		}

		for (const { node, direction } of getNeighbours(currentNode)) {
			const g =
				currentNode.g + calcDirectionScore(currentNode.direction, direction);
			const h = calcH(node);

			const scoredNode = {
				...node,
				g,
				h,
				f: g + h,
				parent: currentNode,
				direction,
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

const printGrid = (grid: Cell[][], path: Set<CoordKey>) => {
	if (!process.env.PRINT) {
		return;
	}

	for (const row of grid) {
		console.log(
			row
				.map((cell) => {
					if (cell.type === "wall") {
						return "#";
					}

					if (cell.type === "start") {
						return "S";
					}

					if (cell.type === "end") {
						return "E";
					}

					if (path.has(coordKey(cell))) {
						return styleText("bgGreen", "x");
					}

					return " ";
				})
				.join(""),
		);
	}
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

export const run1 = (input: string[]): number => {
	const { start, end, grid } = parseInput(input);

	const solutionNode = findPaths(grid, start, end);
	const path = getSolution(solutionNode);

	printGrid(grid, new Set(path.map(coordKey)));

	const score = path.reduce(
		(acc, { direction }, i, arr) =>
			acc + 1 + calcDirectionScore(direction, arr[i - 1]?.direction ?? "E"),
		-1,
	);

	return score;
};

export const run2 = (_input: string[]): number => {
	return 0;
};
