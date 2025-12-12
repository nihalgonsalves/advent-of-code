const parseInput = (input: string[]) =>
	input.map((line) => {
		const [device, outputs] = line.split(": ");
		return {
			device,
			outputs: outputs.split(" "),
		};
	});

class TraverseAll {
	private adjacency: Record<string, string[]>;

	constructor(adjacency: Record<string, string[]>) {
		this.adjacency = adjacency;
	}

	traverse(path: string[]): string[][] {
		const cursor = path.at(-1)!;
		if (cursor === "out") {
			return [path];
		}

		const nextOutputs = this.adjacency[cursor] ?? [];

		return nextOutputs.flatMap((output) => this.traverse([...path, output]));
	}
}

export const run1 = (input: string[]): number => {
	const devices = parseInput(input);
	const outputsByDevice = Object.fromEntries(
		devices.map(({ device, outputs }) => [device, outputs]),
	);

	return new TraverseAll(outputsByDevice).traverse(["you"]).length;
};

export const run2 = (_input: string[]): number => {
	return 0;
};
