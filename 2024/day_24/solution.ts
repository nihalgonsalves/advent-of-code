import * as R from "ramda";

type Instruction = { lhs: string; operand: string; rhs: string };

const parseInput = (input: string) => {
	const [bitStr, gateStr] = input.trim().split("\n\n");

	const bits = Object.fromEntries(
		bitStr.split("\n").map((line) => {
			const [name, value] = line.split(": ");
			return [name, Number.parseInt(value, 10)] as const;
		}),
	);

	const gates: [string, Instruction][] = gateStr.split("\n").map((line) => {
		const [instruction, name] = line.split(" -> ");
		const [lhs, operand, rhs] = instruction.split(" ");

		return [name, { lhs, operand, rhs }];
	});

	return { bits, gates };
};

export const run1 = (input: string): number => {
	const result = parseInput(input);
	const { bits } = result;
	let { gates } = result;

	while (gates.length > 0) {
		const [gatesToProcess, nextGates] = R.partition(
			([_, { lhs, rhs }]) => lhs in bits && rhs in bits,
			gates,
		);

		gates = nextGates;

		for (const [name, { lhs, operand, rhs }] of gatesToProcess) {
			switch (operand) {
				case "AND":
					bits[name] = bits[lhs] & bits[rhs];
					break;
				case "OR":
					bits[name] = bits[lhs] | bits[rhs];
					break;
				case "XOR":
					bits[name] = bits[lhs] ^ bits[rhs];
					break;
				default:
					throw new Error(`Unknown operand: ${operand}`);
			}
		}
	}

	const binaryNumber = Object.entries(bits)
		.filter(([name]) => name.startsWith("z"))
		.sort(([a], [b]) => b.localeCompare(a))
		.map(([, value]) => value)
		.join("");

	return Number.parseInt(binaryNumber, 2);
};

export const run2 = (_input: string): number => {
	return 0;
};
