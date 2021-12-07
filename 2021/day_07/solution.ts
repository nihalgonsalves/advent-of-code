import assert from "assert";
import R from "ramda";

import { getInputLines } from "../getInputLines";

const [rawPositions] = getInputLines("07");

const positions = rawPositions.split(",").map((s) => parseInt(s, 10));

const median = R.median(positions);

const cost = R.sum(positions.map((pos) => Math.abs(pos - median)));

console.log({ cost });

assert.strictEqual(cost, 345035);
