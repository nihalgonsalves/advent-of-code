import * as R from "ramda";

export const run1 = (input: string[]): number => {
	const items = input[0].split(",");

	const sums = items.map((item) =>
		item.split("").reduce((acc, curr) => {
			let val = acc + curr.charCodeAt(0);
			val *= 17;
			val %= 256;
			return val;
		}, 0),
	);

	return R.sum(sums);
};

export const run2 = (_input: string[]): number => {
	return 0;
};
