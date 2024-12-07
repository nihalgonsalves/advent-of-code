type IncompleteEquation = { result: number; operands: number[] };
type Operator = "+" | "*";

const parseInput = (input: string[]): IncompleteEquation[] =>
	input.map((line) => {
		const [result, operands] = line.split(": ");
		return {
			result: Number.parseInt(result, 10),
			operands: operands
				.split(/\s+/)
				.map((operand) => Number.parseInt(operand, 10)),
		};
	});

const binaryPermutations = (n: number): Operator[][] => {
	if (n === 1) {
		return [["+"], ["*"]];
	}

	return binaryPermutations(n - 1).flatMap((permutation) =>
		(["+", "*"] as const).map((operator: Operator) => [
			...permutation,
			operator,
		]),
	);
};

const isValid = (operation: IncompleteEquation): boolean => {
	const permutations = binaryPermutations(operation.operands.length - 1);

	return permutations.some((permutation) => {
		const [startingSum, ...operands] = operation.operands;

		return (
			operation.result ===
			operands.reduce((acc, operand, i) => {
				const operator = permutation[i];
				return operator === "+" ? acc + operand : acc * operand;
			}, startingSum)
		);
	});
};

export const run1 = (input: string[]): number => {
	const operations = parseInput(input);

	return operations
		.filter((operation) => isValid(operation))
		.reduce((acc, operation) => acc + operation.result, 0);
};

export const run2 = (input: string[]): number => {
	return 0;
};
