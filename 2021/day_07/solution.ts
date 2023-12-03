import assert from "assert";
import * as R from "ramda";

import { getInputLines } from "../../getInputLines";

const [rawPositions] = await getInputLines(import.meta.url);

const positions = rawPositions.split(",").map((s) => parseInt(s, 10));

const costToMove = (dest: number, transform = (n: number) => n) =>
  R.sum(positions.map((pos) => transform(Math.abs(pos - dest))));

// Part 1

const median = R.median(positions);
const simpleCost = costToMove(median);

// Part 2

const mean = R.mean(positions);

const calcIncreasingCost = (n: number) => R.sum(R.range(1, n + 1));

const results = [Math.floor, Math.ceil].map((fn) => {
  const value = fn(mean);
  const cost = costToMove(value, calcIncreasingCost);

  return { value, cost };
});

const [{ value: usedMeanValue, cost: increasingCost }] = R.sortBy(
  (r) => r.cost,
  results
);

// Solution

assert.strictEqual(simpleCost, 345035);
assert.strictEqual(increasingCost, 97038163);

console.log({
  median,
  simpleCost,
  mean,
  usedMeanValue,
  increasingCost,
});
