import * as R from "ramda";

const getHighestNumber = (row: number[], required: number) => {
	const pickedDigits = [];

	let leftCursor = 0;
	let rightCursor: number;

	// pick the max value in a window starting from after the last picked digit
	// and ensuring that there will always be enough remaining digits to pick N
	// values

	while (pickedDigits.length < required) {
		rightCursor = row.length - required + pickedDigits.length;

		const [{ i, digit }] = R.pipe(
			() => R.range(leftCursor, rightCursor + 1),
			R.map((i) => ({ i, digit: row[i] })),
			R.sortBy(({ digit }) => -digit),
		)();

		pickedDigits.push(digit * 10 ** (required - pickedDigits.length - 1));
		leftCursor = i + 1;
	}

	return R.sum(pickedDigits);
};

const mapToDigits = R.pipe(
	R.split(""),
	R.map((c) => parseInt(c, 10)),
);

export const run1 = R.pipe(
	R.map(mapToDigits),
	R.map((row) => getHighestNumber(row, 2)),
	R.sum,
);

export const run2 = R.pipe(
	R.map(mapToDigits),
	R.map((row) => getHighestNumber(row, 12)),
	R.sum,
);
