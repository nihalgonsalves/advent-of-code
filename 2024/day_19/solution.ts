const parseInput = ([patternsStr, ...designsStr]: string[]) => {
	const patterns = patternsStr.split(", ");
	const designs = designsStr;

	return { patterns, designs };
};

const getCounts = (input: string[]) => {
	const { patterns, designs } = parseInput(input);

	const cache = new Map<string, number>();

	const countPossible = (design: string): number => {
		if (design === "") {
			return 1;
		}

		if (cache.has(design)) {
			return cache.get(design)!;
		}

		cache.set(
			design,
			patterns.reduce((acc, pattern) => {
				if (design.startsWith(pattern)) {
					return acc + countPossible(design.slice(pattern.length));
				}

				return acc;
			}, 0),
		);

		return cache.get(design)!;
	};

	return designs.map((design) => countPossible(design));
};

export const run1 = (input: string[]): number => {
	return getCounts(input).filter((count) => count !== 0).length;
};

export const run2 = (input: string[]): number => {
	return getCounts(input).reduce((acc, count) => acc + count, 0);
};
