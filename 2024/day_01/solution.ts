import * as R from "ramda";

const parseInput = (input: string[]) => {
	const left = [];
	const right = [];

	for (const line of input) {
		const [a, b] = line.split(/\s+/).map((str) => Number.parseInt(str, 10));

		left.push(a);
		right.push(b);
	}

	return { left: left.toSorted(), right: right.toSorted() };
};

export const run1 = (input: string[]): number => {
	const { left, right } = parseInput(input);

	return R.pipe(
		() => R.zip(left, right),
		R.map(([a, b]) => Math.abs(a - b)),
		R.sum,
	)();
};

export const run2 = (input: string[]): number => {
	const { left, right } = parseInput(input);

	const rightOccurrences = R.countBy(R.identity, right);

	return R.pipe(
		() => left,
		R.map((value) => value * (rightOccurrences[value] ?? 0)),
		R.sum,
	)();
};
