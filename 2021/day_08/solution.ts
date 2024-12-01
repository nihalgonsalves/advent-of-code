import assert from "assert";

import * as R from "ramda";

import { getInputLines } from "../../getInputLines";

const setMinus = <T>(a: Set<T>, b: Set<T>) => {
	const result = new Set(a);

	b.forEach((value) => {
		result.delete(value);
	});

	return result;
};

const setToString = (set: Set<string>) => [...set.values()].sort().join("");

const output = (await getInputLines(import.meta.url)).map((line) => {
	const [signalPatterns, outputDigitPatterns] = line
		.split(" | ")
		.map((section) =>
			section.split(" ").map((s: string) => new Set(s.split(""))),
		);

	const patterns: Set<string>[] = [];

	//      count  unique  a  b  c  d  e  f  g
	// 0 =>   6     no     *  *  *  -  *  *  *
	// 1 =>   2     yes    -  -  *  -  -  *  -
	// 2 =>   5     no     *  -  *  *  *  -  *
	// 3 =>   5     no     *  -  *  *  -  *  *
	// 4 =>   4     yes    -  *  *  *  -  *  -
	// 5 =>   5     no     *  *  -  *  -  *  *
	// 6 =>   6     no     *  *  -  *  *  *  *
	// 7 =>   3     yes    *  -  *  -  -  *  -
	// 8 =>   7     yes    *  *  *  *  *  *  *
	// 9 =>   6     no     *  *  *  *  -  *  *
	let remainingSignalPatterns = signalPatterns.filter((pattern) => {
		switch (pattern.size) {
			case 2:
				patterns[1] = pattern;
				return false;
			case 4:
				patterns[4] = pattern;
				return false;
			case 3:
				patterns[7] = pattern;
				return false;
			case 7:
				patterns[8] = pattern;
				return false;
			default:
				return true;
		}
	});

	const segmentBandD = setMinus(patterns[4], patterns[7]);
	const segmentCandF = patterns[1];
	const segmentEandG = setMinus(
		patterns[8],
		new Set([...patterns[4], ...patterns[7]]),
	);

	remainingSignalPatterns = remainingSignalPatterns.filter((pattern) => {
		//      count  unique  a  c  e  f  g
		// 0 =>   5     no     *  *  *  *  *
		// 2 =>   4     no     *  *  *  -  *
		// 3 =>   4     no     *  *  -  *  *
		// 5 =>   3     yes    *  -  -  *  *
		// 6 =>   4     no     *  -  *  *  *
		// 9 =>   4     no     *  *  -  *

		if (setMinus(pattern, segmentBandD).size === 3) {
			patterns[5] = pattern;
			return false;
		}

		//      count  unique  a  b  d  e  g
		// 0 =>   4     no     *  *  -  *  *
		// 2 =>   4     no     *  -  *  *  *
		// 3 =>   3     yes    *  -  *  -  *
		// 5 =>   4     no     *  *  *  -  *
		// 6 =>   5     yes    *  *  *  *  *
		// 9 =>   4     no     *  *  *  -  *

		if (setMinus(pattern, segmentCandF).size === 3) {
			patterns[3] = pattern;
			return false;
		}

		if (setMinus(pattern, segmentCandF).size === 5) {
			patterns[6] = pattern;
			return false;
		}

		return true;
	});

	remainingSignalPatterns.forEach((pattern) => {
		//      count  unique  a  b  c  d  f
		// 0 =>   4     yes    *  *  *  -  *
		// 2 =>   3     yes    *  -  *  *  -
		// 9 =>   5     yes    *  *  *  *  *
		switch (setMinus(pattern, segmentEandG).size) {
			case 4:
				patterns[0] = pattern;
				break;
			case 3:
				patterns[2] = pattern;
				break;
			case 5:
				patterns[9] = pattern;
				break;
			default:
				break;
		}
	});

	const patternLookup = Object.fromEntries(
		patterns.map((pattern, i) => [setToString(pattern), i]),
	);

	return outputDigitPatterns.map(
		(digitPattern) => patternLookup[setToString(digitPattern)],
	);
});

// Part 1

const simpleDigitCount = output.flatMap((digits) =>
	digits.filter((digit) => [1, 4, 7, 8].includes(digit)),
).length;

// Part 2

const total = R.sum(output.map((digits) => parseInt(digits.join(""), 10)));

// Solution

assert.strictEqual(simpleDigitCount, 261);
assert.strictEqual(total, 987553);

console.log({ simpleDigitCount, total });
