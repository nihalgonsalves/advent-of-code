import assert from "node:assert";
import * as R from "ramda";

import { getInputLines } from "../../getInputLines";

const [initialFish] = await getInputLines(import.meta.url);

// <age, count>
let fishState = R.countBy((age) => age, initialFish.split(","));

const tick = () => {
	fishState = {
		"0": fishState["1"] ?? 0,
		"1": fishState["2"] ?? 0,
		"2": fishState["3"] ?? 0,
		"3": fishState["4"] ?? 0,
		"4": fishState["5"] ?? 0,
		"5": fishState["6"] ?? 0,
		// new fish
		"6": (fishState["7"] ?? 0) + (fishState["0"] ?? 0),
		"7": fishState["8"] ?? 0,
		// reset fish
		"8": fishState["0"] ?? 0,
	};
};

R.times(tick, 80);
const firstCount = R.sum(R.values(fishState));

R.times(tick, 256 - 80);
const secondCount = R.sum(R.values(fishState));

assert.strictEqual(firstCount, 388739);
assert.strictEqual(secondCount, 1741362314973);

console.log({ firstCount, secondCount });
