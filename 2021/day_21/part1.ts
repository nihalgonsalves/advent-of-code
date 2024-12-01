import assert from "assert";

import * as R from "ramda";

import { startingUniverse, getNextParams, wrapAround } from "./common";

let universe = startingUniverse;

class Die {
	private i = 1;
	public n = 0;

	roll() {
		this.n += 1;

		const val = this.i;
		this.i = wrapAround(this.i + 1, 100);
		return val;
	}
}

const die = new Die();

const tick = () => {
	const { positions, scores, player } = universe;

	const { player: newPlayer, positions: newPositions } = getNextParams(
		{ positions, player },
		R.sum(R.times(() => die.roll(), 3)),
	);

	const newScores = { ...scores };
	newScores[player] += newPositions[player];

	universe = {
		player: newPlayer,
		positions: newPositions,
		scores: newScores,
	};
};

while (universe.scores[1] < 1000 && universe.scores[2] < 1000) {
	tick();
}

const losingPlayerScore =
	universe.scores[1] < 1000 ? universe.scores[1] : universe.scores[2];
const part1 = die.n * losingPlayerScore;

assert.strictEqual(part1, 679329);

console.log({ part1 });
