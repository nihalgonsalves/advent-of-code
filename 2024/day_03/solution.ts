const multiplyFromGroups = (groups: Record<string, string>): number => {
	const lhs = Number.parseInt(groups.lhs, 10);
	const rhs = Number.parseInt(groups.rhs, 10);

	return lhs * rhs;
};

export const run1 = (input: string[]): number => {
	let sum = 0;

	const matches = input.join("\n").matchAll(/mul\((?<lhs>\d+),(?<rhs>\d+)\)/g);

	for (const match of matches) {
		if (!match.groups) continue;

		sum += multiplyFromGroups(match.groups);
	}

	return sum;
};

export const run2 = (input: string[]): number => {
	let sum = 0;
	let active = true;

	const matches = input
		.join("\n")
		.matchAll(/(?<marker>do(?:n't)?\(\))|(mul\((?<lhs>\d+),(?<rhs>\d+)\))/g);

	for (const match of matches) {
		if (!match.groups) continue;

		if (match.groups.marker) {
			active = match.groups.marker === "do()";
		} else if (active) {
			sum += multiplyFromGroups(match.groups);
		}
	}

	return sum;
};
