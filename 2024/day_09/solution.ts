import * as R from "ramda";

type Block = { type: "file"; id: number } | { type: "free"; id: undefined };

const parseInput = (input: string): Block[] =>
	R.splitEvery(2, input.split("")).flatMap(([fileSize, freeSize], id) => [
		...Array.from({ length: Number.parseInt(fileSize, 10) }).map(
			() =>
				({
					id,
					type: "file",
				}) as const,
		),
		...Array.from({
			length: freeSize ? Number.parseInt(freeSize, 10) : 0,
		}).map(
			() =>
				({
					id: undefined,
					type: "free",
				}) as const,
		),
	]);

const swap = (blocks: Block[], left: number, right: number) => {
	[blocks[left], blocks[right]] = [blocks[right], blocks[left]];
};

export const run1 = ([input]: string[]): number => {
	const blocks = parseInput(input);

	let left = 0;
	let right = blocks.length - 1;

	while (left < right) {
		if (blocks[left].type === "file") {
			left++;
		} else {
			swap(blocks, left, right);
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
	const blocks = parseInput(input);

	const getLeftFreeBlocks = (start: number, rightFileIndices: number[]) => {
		if (start === rightFileIndices[0] || blocks[start] == null) {
			return null;
		}

		if (blocks[start].type === "file") {
			return getLeftFreeBlocks(start + 1, rightFileIndices);
		}

		const count = R.takeWhile(
			(block) => block.type === "free",
			blocks.slice(start, rightFileIndices[0]),
		).length;

		if (count < rightFileIndices.length) {
			return getLeftFreeBlocks(start + count, rightFileIndices);
		}

		return Array.from({ length: count }, (_, i) => start + i);
	};

	const getRightFileBlocks = (end: number) => {
		const count = R.takeWhile(
			(block) => block.type === "file" && block.id === blocks[end].id,
			blocks.slice(0, end + 1).reverse(),
		).length;

		return Array.from({ length: count }, (_, i) => end - i);
	};

	for (let right = blocks.length - 1; right > 0; ) {
		if (blocks[right].type === "free") {
			right--;
			continue;
		}

		const rightFile = getRightFileBlocks(right);
		const leftFree = getLeftFreeBlocks(0, rightFile);

		if (!leftFree) {
			right -= rightFile.length;
			continue;
		}

		for (const [rightFileLocalIndex, rightBlockIndex] of rightFile.entries()) {
			swap(blocks, leftFree[rightFileLocalIndex], rightBlockIndex);
		}

		right -= rightFile.length;
	}

	const checksum = blocks.reduce(
		(acc, block, index) =>
			block.type === "file" ? acc + block.id * index : acc,
		0,
	);

	return checksum;
};
