import { Graph } from "@dagrejs/graphlib";

type Coord = {
	x: number;
	y: number;
};

const CellType = {
	START: "S",
	EMPTY: ".",
	SPLITTER: "^",
} as const;

type Cell = Coord & {
	type: (typeof CellType)[keyof typeof CellType];
};

const parseInput = (input: string[]) => {
	let start: Coord | undefined;

	const manifold = input.map((line, y) =>
		line.split("").map((char, x): Cell => {
			const coord = { x, y };

			if (char === "^") {
				return { x, y, type: CellType.SPLITTER };
			}

			if (char === "S") {
				start = coord;
				return { x, y, type: CellType.START };
			}

			return { x, y, type: CellType.EMPTY };
		}),
	);

	if (!start) {
		throw new Error("Start not found");
	}

	return { start, manifold };
};

const coordKey = ({ x, y }: Coord): CoordKey => `${x},${y}`;
type CoordKey = `${number},${number}`;

type Node = Coord & { type: "start" | "end" | "splitter" };

const buildGraph = (manifold: Cell[][], start: Coord) => {
	const graph = new Graph({
		directed: true,
	});

	const beam = new Set<`${CoordKey}:${CoordKey}`>();

	const emit = (prevNode: Coord, tachyon: Coord) => {
		const pair = `${coordKey(prevNode)}:${coordKey(tachyon)}` as const;

		if (beam.has(pair)) {
			return;
		}
		beam.add(pair);

		const nextCell = manifold.at(tachyon.y + 1)?.at(tachyon.x);
		if (!nextCell) {
			graph.setNode(coordKey(tachyon), {
				x: tachyon.x,
				y: tachyon.y,
				type: "end",
			} satisfies Node);
			graph.setEdge(coordKey(prevNode), coordKey(tachyon));
			return;
		}

		if (nextCell.type === CellType.EMPTY) {
			emit(prevNode, nextCell);
		}

		if (nextCell.type === CellType.SPLITTER) {
			graph.setNode(coordKey(nextCell), {
				x: nextCell.x,
				y: nextCell.y,
				type: "splitter",
			} satisfies Node);
			graph.setEdge(coordKey(prevNode), coordKey(nextCell));

			emit(nextCell, { y: nextCell.y, x: nextCell.x - 1 });
			emit(nextCell, { y: nextCell.y, x: nextCell.x + 1 });
		}
	};

	graph.setNode(coordKey(start), {
		x: start.x,
		y: start.y,
		type: "start",
	} satisfies Node);
	emit(start, start);

	return graph;
};

export const run1 = (input: string[]): number => {
	const { start, manifold } = parseInput(input);
	const graph = buildGraph(manifold, start);

	return graph
		.nodes()
		.values()
		.map((nodeId) => graph.node(nodeId))
		.filter((node: Node) => node.type === "splitter")
		.toArray().length;
};

export const run2 = (input: string[]): number => {
	const { start, manifold } = parseInput(input);
	const graph = buildGraph(manifold, start);

	// the end nodes are terminal and represent a single timeline only
	const timelinesBelow = new Map<CoordKey, number>(
		graph
			.nodes()
			.values()
			.map((nodeId) => graph.node(nodeId))
			.filter((node: Node) => node.type === "end")
			.map((node: Node) => [coordKey(node), 1]),
	);

	const nonTerminalNodes = graph
		.nodes()
		.values()
		.map((nodeId) => graph.node(nodeId))
		.filter((node: Node) => node.type === "splitter" || node.type === "start")
		.toArray()
		// starting from the bottom row of splitters ...
		.sort((a, b) => b.y - a.y);

	// ... build a count by summing the count of the successors
	for (const node of nonTerminalNodes) {
		const successors = graph.successors(coordKey(node));
		if (!successors?.length) {
			// all non-terminal nodes have at least one successor (start = 1, splitter = 2)
			throw new Error(`No successors found for ${coordKey(node)}`);
		}

		const successorTimelines = successors.map((successor) => {
			const successorCount = timelinesBelow.get(successor as CoordKey);
			if (successorCount == null) {
				// we always have set lower values, so this should never happen
				throw new Error(`Successor count not found for ${successor}`);
			}

			return successorCount;
		});

		timelinesBelow.set(
			coordKey(node),
			successorTimelines.reduce((acc, curr) => acc + curr, 0),
		);
	}

	return timelinesBelow.get(coordKey(start))!;
};
