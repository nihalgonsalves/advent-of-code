import { alg, Graph } from "@dagrejs/graphlib";

type JunctionBox = {
	x: number;
	y: number;
	z: number;
};

const parseInput = (input: string[]) =>
	input.map((line): JunctionBox => {
		const [x, y, z] = line.split(",").map((str) => Number.parseInt(str, 10));
		return { x, y, z };
	});

const boxKey = (box: JunctionBox) => `${box.x},${box.y},${box.z}`;

const buildGraph = (junctionBoxes: JunctionBox[]) => {
	const graph = new Graph({
		directed: false,
	});

	for (const box of junctionBoxes) {
		graph.setNode(boxKey(box));
	}

	return graph;
};

const getDistances = (junctionBoxes: JunctionBox[]) =>
	allPairs(junctionBoxes)
		.map(([a, b]) => ({
			a,
			b,
			distance: Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2),
		}))
		.sort((a, b) => a.distance - b.distance)
		.map(({ a, b }) => [a, b]);

export const allPairs = <T>(array: T[]) =>
	array.flatMap((a, i) => array.slice(i + 1).map((b): [T, T] => [a, b]));

export const run1 = (input: string[], count: number): number => {
	const junctionBoxes = parseInput(input);
	const graph = buildGraph(junctionBoxes);

	const distances = getDistances(junctionBoxes);

	for (const [a, b] of distances.slice(0, count)) {
		graph.setEdge(boxKey(a), boxKey(b));
	}

	const circuitSizes = alg
		.components(graph)
		.map((component) => component.length)
		.sort((a, b) => b - a);

	return circuitSizes[0] * circuitSizes[1] * circuitSizes[2];
};

export const run2 = (input: string[]): number => {
	const junctionBoxes = parseInput(input);
	const graph = buildGraph(junctionBoxes);

	const distances = getDistances(junctionBoxes);

	for (const [a, b] of distances) {
		graph.setEdge(boxKey(a), boxKey(b));

		if (alg.components(graph).length === 1) {
			return a.x * b.x;
		}
	}

	return 0;
};
