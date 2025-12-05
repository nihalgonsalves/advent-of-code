type Range = { start: number; end: number };

const parseInput = (input: string) => {
	const [rangesStr, ingredientsStr] = input.split("\n\n");

	const ranges = rangesStr.split("\n").map((line) => {
		const [start, end] = line.split("-").map((str) => Number.parseInt(str, 10));

		return { start, end };
	});

	const ingredients = ingredientsStr
		.split("\n")
		.values()
		.filter((str) => str !== "")
		.map((str) => Number.parseInt(str, 10));

	return { ranges, ingredients };
};

export const run1 = (input: string): number => {
	const { ranges, ingredients } = parseInput(input);

	return ingredients
		.filter((ingredient) =>
			ranges.some(({ start, end }) => start <= ingredient && ingredient <= end),
		)
		.toArray().length;
};

export const allPairs = <T>(array: T[]) =>
	array.flatMap((a, i) =>
		array
			.slice(i + 1)
			.map((b, j): [{ i: number; a: T }, { j: number; b: T }] => [
				{ i, a },
				{ j: i + j + 1, b },
			]),
	);

export const simplifyRanges = (ranges: Range[]): Range[] => {
	let simplifiedRanges = [...ranges];

	while (true) {
		const rangesToAdd: Range[] = [];
		const rangesToRemove = new Set<number>();

		for (const [{ a, i }, { b, j }] of allPairs(simplifiedRanges)) {
			if (rangesToRemove.has(i) || rangesToRemove.has(j)) {
				// do nothing, one of these ranges effectively does not exist anymore
			} else if (a.start <= b.start && b.end <= a.end) {
				// b is fully contained in a
				// [aS, .., .., .., .., aE]
				//     [bS, .., .., bE]
				rangesToRemove.add(j);
			} else if (b.start <= a.start && a.end <= b.end) {
				// a is fully contained in b
				//     [aS, .., .., aE]
				// [bS, .., .., .., .., bE]
				rangesToRemove.add(i);
			} else if (a.start <= b.start && b.start <= a.end && a.end <= b.end) {
				// a is to the left of b and overlapping, forming one big range
				// [aE, .., .., aE]
				//     [bE, .., .., bE]
				rangesToRemove.add(i);
				rangesToRemove.add(j);
				rangesToAdd.push({ start: a.start, end: b.end });
			} else if (b.start <= a.start && a.start <= b.end && b.end <= a.end) {
				// check if a is to the right of b and overlapping, forming one big range
				//     [aE, .., .., aE]
				// [bE, .., .., bE]
				rangesToRemove.add(i);
				rangesToRemove.add(j);
				rangesToAdd.push({ start: b.start, end: a.end });
			}
		}

		if (rangesToRemove.size === 0 && rangesToAdd.length === 0) {
			break;
		}

		simplifiedRanges = [
			...simplifiedRanges.filter((_, i) => !rangesToRemove.has(i)),
			...rangesToAdd,
		];
	}

	return simplifiedRanges;
};

const countRange = (range: Range) => range.end - range.start + 1;

export const run2 = (input: string): number =>
	simplifyRanges(parseInput(input).ranges).reduce(
		(acc, range) => acc + countRange(range),
		0,
	);
