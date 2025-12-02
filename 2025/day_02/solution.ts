import * as R from "ramda";

const parseInput = (input: string) =>
	input.split(",").flatMap((rangeStr) => {
		const [start, end] = rangeStr.split("-").map((n) => parseInt(n, 10));

		return R.range(start, end + 1);
	});

export const run1 = ([input]: string[]): number => {
	const numbers = parseInput(input).filter((n) => {
		const str = n.toFixed(0);

		const even = str.length % 2 === 0;
		if (!even) {
			return false;
		}

		const [left, right] = R.splitAt(str.length / 2, str);

		return left === right;
	});

	return R.sum(numbers);
};

// slightly faster starting this way because it's more likely that a larger
// factor will be a matching pair and stop iterating early
function* reversedRange(start: number, end: number) {
	for (let i = end - 1; i >= start; i--) {
		yield i;
	}
}

const allFactors = (n: number) =>
	reversedRange(1, n).filter((x) => n % x === 0);

const allPartsSame = (splitEvery: number, str: string) => {
	const firstPart = str.slice(0, splitEvery);

	for (let i = splitEvery; i < str.length; i += splitEvery) {
		if (str.slice(i, i + splitEvery) !== firstPart) {
			return false;
		}
	}

	return true;
};

export const run2 = ([input]: string[]): number =>
	R.pipe(
		parseInput,
		R.filter((n: number) => {
			const str = n.toFixed(0);

			for (const factor of allFactors(str.length)) {
				if (allPartsSame(factor, str)) {
					return true;
				}
			}

			return false;
		}),
		R.sum,
	)(input);
