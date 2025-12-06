import * as R from "ramda";

const calculate = R.map<
	{ operation: string | undefined; numbers: number[] },
	number
>(({ operation, numbers }) => {
	switch (operation) {
		case "*":
			return R.reduce(R.multiply, 1, numbers);
		case "+":
			return R.reduce(R.add, 0, numbers);
		default:
			throw new Error(`Unknown operation: ${operation}`);
	}
});

export const run1 = R.pipe(
	(input: string[]) => input.map((line) => line.trim().split(/\s+/)),
	R.transpose,
	R.map((row) => {
		const operation = row.at(-1);
		const numbers = row.slice(0, -1).map((cell) => parseInt(cell, 10));

		return { operation, numbers };
	}),
	calculate,
	R.sum,
);

export const run2 = R.pipe(
	(input: string[]) => input.map((line) => line.split("")),
	R.transpose,
	R.splitWhenever((row: string[]) => row.every((cell) => cell === " ")),
	R.map((verticalLines) => {
		const operation = verticalLines.at(0)!.at(-1)!;
		const numbers = verticalLines.map((line) =>
			parseInt(line.slice(0, -1).join("").trim(), 10),
		);

		return { operation, numbers };
	}),
	calculate,
	R.sum,
);
