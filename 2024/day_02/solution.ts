const toMatrix = (input: string[]): number[][] =>
	input.map((line) => line.split(/\s+/).map((str) => Number.parseInt(str, 10)));

const lineIsSafe = (line: number[]): boolean => {
	const increasing = line[0] < line[1];

	const isSafe = (i: number) => {
		const diff = increasing ? line[i + 1] - line[i] : line[i] - line[i + 1];

		return 1 <= diff && diff <= 3;
	};

	return line.slice(0, -1).every((_, i) => isSafe(i));
};

export const run1 = (input: string[]): number => {
	const matrix = toMatrix(input);

	return matrix.filter((line) => lineIsSafe(line)).length;
};

export const run2 = (input: string[]): number => {
	const matrix = toMatrix(input);

	return matrix.filter((line) =>
		line.some((_, i) => lineIsSafe(line.toSpliced(i, 1))),
	).length;
};
