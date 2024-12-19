const parseInput = ([patternsStr, ...designsStr]: string[]) => {
	const patterns = patternsStr.split(", ");
	const designs = designsStr;

	return { patterns, designs };
};

export const run1 = (input: string[]): number => {
	const { patterns, designs } = parseInput(input);

	const cache = new Map<string, boolean>();

	const isPossible = (design: string): boolean => {
		if (design === "") {
			return true;
		}

		if (cache.has(design)) {
			return cache.get(design)!;
		}

		return patterns.some((pattern) => {
			if (design.startsWith(pattern)) {
				cache.set(design, isPossible(design.slice(pattern.length)));

				return cache.get(design)!;
			}
		});
	};

	return designs.filter((design) => isPossible(design)).length;
};

export const run2 = (input: string[]): number => {
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

	return designs.reduce((acc, design) => acc + countPossible(design), 0);
};
