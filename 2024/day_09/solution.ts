import * as R from "ramda";

type Block = { type: "file"; id: number } | { type: "free" };

const parseInput = (input: string): Block[] =>
	R.splitEvery(2, input.split("")).flatMap(([fileSize, freeSize], id) => [
		...Array.from({ length: Number.parseInt(fileSize, 10) }).map(
			() =>
				({
					type: "file",
					id,
				}) as const,
		),
		...Array.from({
			length: freeSize ? Number.parseInt(freeSize, 10) : 0,
		}).map(
			() =>
				({
					type: "free",
				}) as const,
		),
	]);

export const run1 = ([input]: string[]): number => {
	const blocks = parseInput(input);

	let left = 0;
	let right = blocks.length - 1;

	while (left < right) {
		if (blocks[left].type === "file") {
			left++;
		} else {
			[blocks[left], blocks[right]] = [blocks[right], blocks[left]];
			right--;
		}
	}

	const checksum = blocks.reduce(
		(acc, block, index) =>
			block.type === "file" ? acc + block.id * index : acc,
		0,
	);

	return checksum;
};

export const run2 = ([input]: string[]): number => {
	return 0;
};
