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

const parseInput = (input: string[], prizeOffset = 0): Machine[] =>
	R.splitEvery(3, input).map(([buttonAStr, buttonBStr, prizeStr]) => {
		const prize = getXY(prizeRegex.exec(prizeStr)!);

		return {
			A: getXY(buttonRegex.exec(buttonAStr)!),
			B: getXY(buttonRegex.exec(buttonBStr)!),
			prize: { x: prize.x + prizeOffset, y: prize.y + prizeOffset },
		};
	});

const evaluateMachine = (machine: Machine) => {
	// Equations:
	// machine.A.x * A_MOVES + machine.B.x * B_MOVES = machine.prize.x
	// machine.A.y * A_MOVES + machine.B.y * B_MOVES = machine.prize.y

	// Cramer's Rule:
	// ┌                         ┐ ┌         ┐     ┌                 ┐
	// │ machine.A.x machine.B.x │ │ A_MOVES │     │ machine.prize.x │
	// │                         │ │         │  =  │                 │
	// │ machine.A.y machine.B.y │ │ B_MOVES │     │ machine.prize.y │
	// └                         ┘ └         ┘     └                 ┘

	const D = machine.A.x * machine.B.y - machine.A.y * machine.B.x;
	const Dx = machine.prize.x * machine.B.y - machine.prize.y * machine.B.x;
	const Dy = machine.A.x * machine.prize.y - machine.A.y * machine.prize.x;

	const A_MOVES = Dx / D;
	const B_MOVES = Dy / D;

	if (!Number.isInteger(A_MOVES) || !Number.isInteger(B_MOVES)) {
		return 0;
	}

	return A_MOVES * 3 + B_MOVES * 1;
};

export const run1 = (input: string[]): number =>
	R.sum(parseInput(input).map((machine) => evaluateMachine(machine)));

export const run2 = (input: string[]): number =>
	R.sum(
		parseInput(input, 10000000000000).map((machine) =>
			evaluateMachine(machine),
		),
	);
