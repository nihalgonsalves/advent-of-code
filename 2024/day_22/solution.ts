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
	return 0;
};
