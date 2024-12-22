import * as R from "ramda";

const mix = (operation: (input: bigint) => bigint) => (secret: bigint) =>
	secret ^ operation(secret);

const prune = (n: bigint) => n % 16777216n;

const nextSecret = (secret: bigint) =>
	R.pipe(
		mix((n) => n * 64n),
		prune,
		mix((n) => n / 32n),
		prune,
		mix((n) => n * 2048n),
		prune,
	)(secret);

export const run1 = (input: string[]): bigint => {
	const numbers = input.map((str) => BigInt(str));

	const result = numbers.reduce((acc, n) => {
		return (
			acc +
			Array.from({ length: 2000 }).reduce<bigint>(
				(acc, _) => nextSecret(acc),
				n,
			)
		);
	}, 0n);

	return result;
};

export const run2 = (input: string[]): number => {
	const numbers = input.map((str) => BigInt(str));

	const allSequences = new Set<string>();

	const result = numbers.map((n) => {
		const secrets = Array.from({ length: 2000 - 1 }).reduce<bigint[]>(
			(acc, _) => {
				acc.push(nextSecret(acc.at(-1)!));
				return acc;
			},
			[n],
		);

		const prices = secrets.map((value) => Number(value % 10n));

		const changes = prices.map((value, i, arr) =>
			i === 0 ? undefined : value - arr[i - 1],
		);

		const bananasBySequence: Record<string, number> = {};

		for (let i = 5; i <= changes.length; i++) {
			const sequence = JSON.stringify(changes.slice(i - 4, i));

			allSequences.add(sequence);
			bananasBySequence[sequence] ??= prices[i - 1];
		}

		return bananasBySequence;
	});

	const totalBananasBySequence = allSequences
		.values()
		.map((sequence) =>
			result.reduce(
				(acc, bananasBySequence) => acc + (bananasBySequence[sequence] ?? 0),
				0,
			),
		);

	return Math.max(...totalBananasBySequence);
};
