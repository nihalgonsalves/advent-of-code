import { mathMod } from "ramda";

const DIAL_SIZE = 100;
const START_POSITION = 50;

export const run1 = (input: string[]): number => {
	const numbers = input.map((line) => {
		const direction = line.charAt(0);
		const value = parseInt(line.slice(1), 10);

		return direction === "R" ? value : -value;
	});

	let position = START_POSITION;
	let count = 0;
	for (const num of numbers) {
		position = (position + num) % DIAL_SIZE;
		if (position === 0) {
			count += 1;
		}
	}

	return count;
};

export const run2 = (input: string[]): number => {
	const numbers = input.flatMap((line) => {
		const direction = line.charAt(0);
		const value = parseInt(line.slice(1), 10);

		const sign = direction === "R" ? 1 : -1;

		if (value < DIAL_SIZE) {
			return [value * sign];
		}

		const remainder = value % DIAL_SIZE;
		const values = Array.from(
			{ length: (value - remainder) / DIAL_SIZE },
			() => DIAL_SIZE * sign,
		);
		if (remainder !== 0) {
			values.push(remainder * sign);
		}

		return values;
	});

	let position = START_POSITION;
	let count = 0;

	for (const num of numbers) {
		const prevValue = position;
		const rawValue = position + num;
		position = mathMod(rawValue, DIAL_SIZE);
		if (num === DIAL_SIZE || num === -DIAL_SIZE) {
			count += 1;
		} else if (prevValue !== 0 && (rawValue <= 0 || DIAL_SIZE <= rawValue)) {
			count += 1;
		}
	}

	return count;
};
