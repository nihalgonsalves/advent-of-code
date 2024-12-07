type IncompleteEquation = { result: number; operands: number[] };
type Operator = "+" | "*" | "||";

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

const getPermutations = (n: number, operators: Operator[]): Operator[][] => {
	if (n === 1) {
		return operators.map((operator) => [operator]);
	}

	return getPermutations(n - 1, operators).flatMap((permutation) =>
		operators.map((operator: Operator) => [...permutation, operator]),
	);
};

const isValid = (operation: IncompleteEquation, operators: Operator[]) => {
	const permutations = getPermutations(
		operation.operands.length - 1,
		operators,
	);

	return permutations.some((permutation) => {
		const [startingSum, ...operands] = operation.operands;

		return (
			operation.result ===
			operands.reduce((acc, operand, i) => {
				const operator = permutation[i];

				switch (operator) {
					case "+":
						return acc + operand;
					case "*":
						return acc * operand;
					case "||":
						return Number.parseInt(`${acc}${operand}`, 10);
				}
			}, startingSum)
		);
	});
};

export const run1 = (input: string[]): number => {
	return parseInput(input)
		.filter((operation) => isValid(operation, ["+", "*"]))
		.reduce((acc, operation) => acc + operation.result, 0);
};

export const run2 = (input: string[]): number => {
	return parseInput(input)
		.filter((operation) => isValid(operation, ["+", "*", "||"]))
		.reduce((acc, operation) => acc + operation.result, 0);
};
