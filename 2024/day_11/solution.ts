const parseInput = (input: string): number[] =>
	input.split(" ").map((str) => Number.parseInt(str, 10));

const split = (str: string): number[] => {
	return [
		Number.parseInt(str.substring(0, str.length / 2), 10),
		Number.parseInt(str.substring(str.length / 2), 10),
	];
};

const iterateStone = (stone: number): number[] => {
	if (stone === 0) {
		return [1];
	}

	const str = stone.toFixed(0);
	if (str.length % 2 === 0) {
		return split(str);
	}

	return [stone * 2024];
};

const blink = (stones: number[]): number[] =>
	stones.flatMap((stone) => iterateStone(stone));

export const run1 = ([input]: string[]): number => {
	const stones = parseInput(input);
	const result = Array.from({ length: 25 }).reduce<number[]>(
		(acc) => blink(acc),
		stones,
	);
	return result.length;
};

export const run2 = ([input]: string[]): number => {
	return 0;
};
