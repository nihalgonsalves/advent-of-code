import { isDeepStrictEqual } from "node:util";

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

const sortPages = (
	pages: number[][],
	pageOrdering: Record<number, Set<number>>,
) =>
	pages.map((page) =>
		page.toSorted((a, b) => {
			if (pageOrdering[a]?.has(b)) {
				return -1;
			}

			if (pageOrdering[b]?.has(a)) {
				return 1;
			}

			return 0;
		}),
	);

export const run1 = (input: string): number => {
	const { pageOrdering, pages } = parseInput(input);
	const sortedPages = sortPages(pages, pageOrdering);

	return sortedPages
		.filter((sortedPage, i) => isDeepStrictEqual(pages[i], sortedPage))
		.reduce((acc, page) => acc + page[(page.length - 1) / 2], 0);
};

export const run2 = (input: string): number => {
	const { pageOrdering, pages } = parseInput(input);
	const sortedPages = sortPages(pages, pageOrdering);

	return sortedPages
		.filter((sortedPage, i) => !isDeepStrictEqual(pages[i], sortedPage))
		.reduce((acc, page) => acc + page[(page.length - 1) / 2], 0);
};
