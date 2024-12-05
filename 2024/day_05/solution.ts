const parseInput = (input: string) => {
	const [pageOrderingRulesStr, pagesStr] = input.trim().split("\n\n");

	const pageOrderingRules = pageOrderingRulesStr.split("\n").map((line) => {
		const [left, right] = line
			.split("|")
			.map((str) => Number.parseInt(str, 10));

		return [left, right] as const;
	});

	const pages = pagesStr
		.split("\n")
		.map((line) => line.split(",").map((str) => Number.parseInt(str, 10)));

	const pageOrdering: Record<number, Set<number>> = {};

	for (const [left, right] of pageOrderingRules) {
		pageOrdering[left] ??= new Set();
		pageOrdering[left].add(right);
	}

	return { pageOrdering, pages };
};

export const run1 = (input: string): number => {
	const { pageOrdering, pages } = parseInput(input);

	return pages
		.filter((page) => {
			const pageIndex = Object.fromEntries(
				page.map((page, index) => [page, index]),
			);

			return page.every((update, index) =>
				[...(pageOrdering[update]?.values() ?? [])].every(
					(right) => pageIndex[right] == null || index < pageIndex[right],
				),
			);
		})
		.reduce((acc, page) => acc + page[(page.length - 1) / 2], 0);
};

export const run2 = (input: string): number => {
	const { pageOrdering, pages } = parseInput(input);

	const unorderedPages = pages.filter((page) => {
		const pageIndex = Object.fromEntries(
			page.map((page, index) => [page, index]),
		);

		return page.some((update, index) =>
			[...(pageOrdering[update]?.values() ?? [])].some(
				(right) => pageIndex[right] !== null && index > pageIndex[right],
			),
		);
	});

	return unorderedPages
		.map((page) =>
			page.sort((a, b) => {
				if (pageOrdering[a]?.has(b)) {
					return -1;
				}

				if (pageOrdering[b]?.has(a)) {
					return 1;
				}

				return 0;
			}),
		)
		.reduce((acc, page) => acc + page[(page.length - 1) / 2], 0);
};
