import * as R from "ramda";

type Coordinate = { x: number; y: number };
type Cell = Coordinate & { value: string };

const coordKey = ({ x, y }: Coordinate) => `${x},${y}` as const;
type CoordKey = ReturnType<typeof coordKey>;

const parseInput = (input: string[]): Map<CoordKey, Cell> => {
	const valueMap = new Map<CoordKey, Cell>();

	for (const [y, line] of input.entries()) {
		for (const [x, value] of line.split("").entries()) {
			valueMap.set(coordKey({ x, y }), { x, y, value });
		}
	}

	return valueMap;
};

const neighbourKeys = ({ x, y }: Coordinate) =>
	[
		coordKey({ x, y: y - 1 }), // N
		coordKey({ x: x + 1, y }), // E
		coordKey({ x, y: y + 1 }), // S
		coordKey({ x: x - 1, y }), // W
	] as const;

const floodFill = (
	valueMap: Map<CoordKey, Cell>,
	cell: Cell,
): [CoordKey, Cell][] => [
	[coordKey(cell), cell] as const,
	...neighbourKeys(cell)
		.map((key) => [key, valueMap.get(key)] as const)
		.flatMap(([key, val]) => {
			if (!val || val.value !== cell.value) {
				return [];
			}

			valueMap.delete(key);

			return floodFill(valueMap, val);
		}),
];

const getRegions = (valueMap: Map<CoordKey, Cell>) => {
	const regions: Map<CoordKey, Cell>[] = [];

	while (valueMap.size > 0) {
		const [nextStartKey, nextStart] = valueMap.entries().next().value!;
		valueMap.delete(nextStartKey);

		regions.push(new Map(floodFill(valueMap, nextStart)));
	}

	return regions;
};

const regionScore = (region: Map<CoordKey, Cell>) => {
	const perimeter = region
		.values()
		.flatMap((cell) =>
			neighbourKeys(cell).map((key) => (region.has(key) ? 0 : 1)),
		)
		.toArray();

	return region.size * R.sum(perimeter);
};

export const run1 = (input: string[]): number => {
	const valueMap = parseInput(input);
	const regions = getRegions(valueMap);

	return R.sum(regions.map((region) => regionScore(region)));
};

export const run2 = (input: string[]): number => {
	return 0;
};
