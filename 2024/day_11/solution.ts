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

const countStones = (stones: number[]): Map<number, number> => {
	const stoneCount = new Map<number, number>();
	for (const stone of stones) {
		stoneCount.set(stone, (stoneCount.get(stone) ?? 0) + 1);
	}

	return stoneCount;
};

const countNextStones = (
	stoneCount: Map<number, number>,
): Map<number, number> => {
	const newStoneCount = new Map<number, number>();

	for (const [stone, count] of stoneCount) {
		for (const newStone of iterateStone(stone)) {
			newStoneCount.set(newStone, (newStoneCount.get(newStone) ?? 0) + count);
		}
	}

	return newStoneCount;
};

const blink = (stones: number[], n: number): number =>
	Array.from({ length: n })
		.reduce<Map<number, number>>(
			(stoneCount) => countNextStones(stoneCount),
			countStones(stones),
		)
		.entries()
		.reduce((acc, [_, count]) => acc + count, 0);

export const run1 = ([input]: string[]): number => blink(parseInput(input), 25);

export const run2 = ([input]: string[]): number => blink(parseInput(input), 75);
