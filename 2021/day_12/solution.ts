import assert from "node:assert";
import * as R from "ramda";

import { getInputLines } from "../../getInputLines";

const graph: Record<string, string[]> = {};

const pushIfValid = (from: string, to: string) => {
	if (from !== "end" && to !== "start") {
		graph[from] ??= [];
		graph[from].push(to);
	}
};

(await getInputLines(import.meta.url)).forEach((line) => {
	const [a, b] = line.split("-");

	pushIfValid(a, b);
	pushIfValid(b, a);
});

const traverse = (
	bailCondition: (path: string[]) => boolean = R.always(true),
	nodes: string[] = ["start"],
	path: string[] = [],
): string[][] =>
	nodes.flatMap((node) => {
		if (node === "end") {
			return [[...path, "end"]];
		}

		if (/^[a-z]*$/.test(node) && path.includes(node) && bailCondition(path)) {
			return [];
		}

		return traverse(bailCondition, graph[node] ?? [], [...path, node]);
	});

// Part 1

const part1 = traverse();

// Part 2

const part2 = traverse((path) => {
	const visited = new Set<string>();

	for (const node of path) {
		if (/^[a-z]*$/.test(node)) {
			if (visited.has(node)) {
				return true;
			}
			visited.add(node);
		}
	}

	return false;
});

// Solution

assert.strictEqual(part1.length, 3708);
assert.strictEqual(part2.length, 93858);

console.log({
	part1: part1.length,
	part2: part2.length,
});
