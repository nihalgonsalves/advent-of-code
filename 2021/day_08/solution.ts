import assert from "assert";
import R from "ramda";

import { getInputLines } from "../getInputLines";

const lines = getInputLines("08").map((line) =>
  line
    .split(" | ")
    .map((segment) => segment.split(" ").map((group) => group.split("")))
) as [string[][], string[][]][];

const countByLetter = {
  "1": 2,
  "2": 5,
  "3": 5,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 3,
  "8": 7,
  "9": 6,
};

const simpleDigits = ["1", "4", "7", "8"] as const;

const simpleDigitLetterCounts = R.pipe(
  R.pick(simpleDigits),
  R.values
)(countByLetter);

const simpleDigitCount = R.sum(
  lines.map(
    ([_signalPattern, outputValue]) =>
      outputValue.filter((val) =>
        simpleDigitLetterCounts.includes(R.uniq(val).length)
      ).length
  )
);

assert.strictEqual(simpleDigitCount, 261);

console.log({ simpleDigitCount });
