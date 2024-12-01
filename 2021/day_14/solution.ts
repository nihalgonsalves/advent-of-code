import assert from "assert";
import * as R from "ramda";

import { getInputLines } from "../../getInputLines";

const [rawTemplate, ...rawRules] = await getInputLines(import.meta.url);

const template = rawTemplate.split("");
const rules = Object.fromEntries(
	rawRules.map((rawRule) => rawRule.split(" -> ") as [string, string]),
);

let pairCounts = R.countBy(
	R.identity,
	R.aperture(2, template).map(([a, b]) => `${a}${b}`),
);

const pass = () => {
	const newCounts: Record<string, number> = {};

	Object.entries(pairCounts).forEach(([pair, count]) => {
		const insertion = rules[pair];
		const [a, b] = pair.split("");

		newCounts[`${a}${insertion}`] ??= 0;
		newCounts[`${a}${insertion}`] += count;
		newCounts[`${insertion}${b}`] ??= 0;
		newCounts[`${insertion}${b}`] += count;
	});

	pairCounts = newCounts;
};

const getCountResult = () => {
	const letterCounts: Record<string, number> = {
		// the last value is never counted since  it never
		// features as the first part of a pair, let's add it back
		[template.at(-1)!]: 1,
	};

	Object.entries(pairCounts).forEach(([pair, count]) => {
		letterCounts[pair[0]] ??= 0;
		letterCounts[pair[0]] += count;
	});

	const counts = R.pipe(
		() => Object.entries(letterCounts),
		R.sortBy<[string, number]>(([_, count]) => count),
		R.map(([_, count]) => count),
	)();

	return R.last(counts)! - R.head(counts)!;
};

// Part 1

R.times(pass, 10);
const part1 = getCountResult();

// Part 2

R.times(pass, 30);
const part2 = getCountResult();

// Solution

assert.strictEqual(part1, 2740);
assert.strictEqual(part2, 2959788056211);

console.log({ part1, part2 });
