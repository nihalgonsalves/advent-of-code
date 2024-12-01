const parseInput = (input: string[]): number[][] =>
	input.map((line) => line.split(" ").map((n) => parseInt(n, 10)));

const calcDiffs = (history: number[]): number[][] => {
	let currentDiff = history;
	const diffs: number[][] = [currentDiff];

	do {
		currentDiff = currentDiff
			.slice(0, -1)
			.map((n, i) => currentDiff[i + 1] - n);
		diffs.push(currentDiff);
	} while (currentDiff.some((d) => d !== 0));

	return diffs;
};

export const run1 = (input: string[]): number => {
	const histories = parseInput(input);

	return histories.reduce((acc, history) => {
		// 0   3   6   9  12  15
		// 3   3   3   3   3
		// 0   0   0   0
		const diffs = calcDiffs(history);

		// invert
		diffs.reverse();

		// 0   0   0   0  [0]
		// 3   3   3   3   3  [A]
		// 0   3   6   9  12  15  [B]

		for (const [i, diff] of diffs.entries()) {
			// previous or zero, hence [i - 1] instead of at(i - 1) as that wraps around
			const previousItem = diffs[i - 1]?.at(-1) ?? 0;
			diff.push(diff.at(-1)! + previousItem);
		}

		return acc + diffs.at(-1)!.at(-1)!;
	}, 0);
};

export const run2 = (input: string[]): number => {
	const histories = parseInput(input);

	return histories.reduce((acc, history) => {
		// 0   3   6   9  12  15
		// 3   3   3   3   3
		// 0   0   0   0
		const diffs = calcDiffs(history);

		// invert, reverse
		diffs.forEach((diff) => diff.reverse());
		diffs.reverse();

		// 0   0   0   0  [0]
		// 3   3   3   3   3  [A]
		// 15  12  9   6   3   0  [B]

		for (const [i, diff] of diffs.entries()) {
			// previous or zero, hence [i - 1] instead of at(i - 1) as that wraps around
			const previousItem = diffs[i - 1]?.at(-1) ?? 0;
			diff.push(diff.at(-1)! - previousItem);
		}

		return acc + diffs.at(-1)!.at(-1)!;
	}, 0);
};
