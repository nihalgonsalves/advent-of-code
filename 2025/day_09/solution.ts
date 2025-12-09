type Position = { x: number; y: number };

const parseInput = (input: string[]): Position[] =>
	input.map((line) => {
		const [x, y] = line.split(",").map((n) => Number.parseInt(n, 10));
		return { x, y };
	});

const allPairs = <T>(array: T[]) =>
	array.flatMap((a, i) => array.slice(i + 1).map((b): [T, T] => [a, b]));

const max = (values: number[]) =>
	values.reduce((acc, value) => Math.max(acc, value), Number.NEGATIVE_INFINITY);

export const run1 = (input: string[]): number => {
	const positions = parseInput(input);
	const pairs = allPairs(positions);
	const sizes = pairs.map(
		([a, b]) => (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1),
	);

	return max(sizes);
};

export const run2 = (_input: string[]): number => {
	return 0;
};
