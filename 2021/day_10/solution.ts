import assert from "node:assert";
import * as R from "ramda";

import { getInputLines } from "../../getInputLines";

const lines = (await getInputLines(import.meta.url)).map((line) =>
	line.split(""),
);

const openingSymbols = ["(", "[", "{", "<"];
const closingSymbols = [")", "]", "}", ">"];

const openingToClosing = R.zipObj(openingSymbols, closingSymbols);
const closingToOpening = R.zipObj(closingSymbols, openingSymbols);

const syntaxScores: Record<string, { error: number; completion: number }> = {
	")": { error: 3, completion: 1 },
	"]": { error: 57, completion: 2 },
	"}": { error: 1197, completion: 3 },
	">": { error: 25137, completion: 4 },
};

type ResolvedLine = { type: "corrupted" | "completed"; score: number };

const resolvedLines: ResolvedLine[] = lines.map((line) => {
	const stack: string[] = [];

	for (const sym of line) {
		if (openingSymbols.includes(sym)) {
			stack.push(sym);
		} else if (
			closingSymbols.includes(sym) &&
			stack.pop() !== closingToOpening[sym]
		) {
			return { type: "corrupted", score: syntaxScores[sym].error };
		}
	}

	const completionString = R.reverse(stack).map((s) => openingToClosing[s]);
	const completionScore = completionString.reduce(
		(score, s) => score * 5 + syntaxScores[s].completion,
		0,
	);

	return { type: "completed", score: completionScore };
});

const [completedScores, corruptedScores] = R.pipe(
	R.partition<ResolvedLine>(({ type }) => type === "completed"),
	R.map(R.map(({ score }) => score)),
)(resolvedLines);

// Part 1

const errorScore = R.sum(corruptedScores);

// Part 2

const completionScores = R.sort((a, b) => a - b, completedScores);

const completionScore =
	completionScores[Math.floor(completionScores.length / 2)];

// Solution

assert.strictEqual(errorScore, 341823);
assert.strictEqual(completionScore, 2801302861);
