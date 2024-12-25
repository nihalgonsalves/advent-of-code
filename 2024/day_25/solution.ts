import * as R from "ramda";

const parseInput = (input: string) => {
	const items = input.trim().split("\n\n");

	const [locks, keys] = R.partition(
		(item) => item[0].every((cell) => cell === "#"),
		items.map((item) => item.split("\n").map((row) => row.split(""))),
	);

	const lockPinHeights = locks.map((lock) =>
		R.transpose(lock.slice(1)).map(
			(column) => column.filter((cell) => cell === "#").length,
		),
	);

	const keyHeights = keys.map((key) =>
		R.transpose(key.slice(0, -1)).map(
			(column) => column.filter((cell) => cell === "#").length,
		),
	);

	return { lockPinHeights, keyHeights };
};

export const run1 = (input: string): number => {
	const { lockPinHeights, keyHeights } = parseInput(input);

	const matchingPairs = lockPinHeights.flatMap((lock) =>
		keyHeights.filter((key) => {
			const counts = R.zipWith(
				(lockPinHeight, keyHeight) => lockPinHeight + keyHeight,
				lock,
				key,
			);

			return counts.every((count) => count <= 5);
		}),
	);

	return matchingPairs.length;
};

export const run2 = (input: string): number => {
	return 0;
};
