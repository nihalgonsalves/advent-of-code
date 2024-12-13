import * as R from "ramda";

type Machine = {
	A: { x: number; y: number };
	B: { x: number; y: number };
	prize: { x: number; y: number };
};

const buttonRegex = /Button \w: X\+(?<x>\d+), Y\+(?<y>\d+)/;
const prizeRegex = /Prize: X=(?<x>\d+), Y=(?<y>\d+)/;

const getXY = (matches: RegExpMatchArray): { x: number; y: number } => ({
	x: Number.parseInt(matches.groups!.x, 10),
	y: Number.parseInt(matches.groups!.y, 10),
});

const parseInput = (input: string[]): Machine[] =>
	R.splitEvery(3, input).map(([buttonA, buttonB, prize]) => {
		return {
			A: getXY(buttonRegex.exec(buttonA)!),
			B: getXY(buttonRegex.exec(buttonB)!),
			prize: getXY(prizeRegex.exec(prize)!),
		};
	});

const counts = R.range(0, 101);
const possibilities = R.xprod(counts, counts);

const evaluateMachine = (machine: Machine) =>
	possibilities
		.map(([a, b]) => {
			const tokens = a * 3 + b * 1;
			const position = {
				x: machine.A.x * a + machine.B.x * b,
				y: machine.A.y * a + machine.B.y * b,
			};

			if (position.x === machine.prize.x && position.y === machine.prize.y) {
				return tokens;
			}

			return undefined;
		})
		.filter((p) => p != null)
		.sort((a, b) => a - b)
		.at(0) ?? 0;

export const run1 = (input: string[]): number => {
	const machines = parseInput(input);

	const cost = R.sum(machines.map((machine) => evaluateMachine(machine)));

	return cost;
};

export const run2 = (input: string[]): number => {
	return 0;
};
