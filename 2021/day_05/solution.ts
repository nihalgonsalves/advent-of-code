import assert from "assert";

import R from "ramda";

import { getInputLines } from "../getInputLines";

const inclusiveRange = <T>(a: number, b: number) =>
  a < b ? R.range(a, b + 1) : R.reverse(R.range(b, a + 1));

const overlappingCount = (includeDiagonal = true) =>
  R.pipe(
    () => getInputLines("05"),
    R.map((line) => {
      if (line === "") {
        return [];
      }

      const parsedLine = line
        .split(" -> ")
        .map((pos) => pos.split(",").map((s) => parseInt(s, 10)));

      const [[x1, y1], [x2, y2]] = parsedLine;

      if (x1 === x2) {
        return inclusiveRange(y1, y2).map((y) => ({ x: x1, y }));
      } else if (y1 === y2) {
        return inclusiveRange(x1, x2).map((x) => ({ x, y: y1 }));
      } else if (includeDiagonal) {
        return R.zipWith(
          (x, y) => ({ x, y }),
          inclusiveRange(x1, x2),
          inclusiveRange(y1, y2)
        );
      }

      return [];
    }),
    R.flatten,
    R.countBy((pos) => `${pos.x},${pos.y}`),
    R.filter((count: number) => count > 1),
    R.keys,
    R.length
  )();

const overlappingStraightCount = overlappingCount(false);
const overlappingAllCount = overlappingCount();

console.log({ overlappingStraightCount, overlappingAllCount });

assert.strictEqual(overlappingStraightCount, 4826);
assert.strictEqual(overlappingAllCount, 16793);
