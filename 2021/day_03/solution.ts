import assert from "assert";
import * as R from "ramda";

import { getInputLines } from "../../getInputLines";

const diagnosticReport = R.map(
  R.split(""),
  await getInputLines(import.meta.url)
);

type BitCounter = (report: string[][]) => {
  zeroes: number;
  ones: number;
}[];

const bitCounter: BitCounter = R.pipe(
  R.transpose,
  R.map(R.partition((el) => el === "0")),
  R.map(([zeroes, ones]) => ({ zeroes: zeroes.length, ones: ones.length }))
);

// https://adventofcode.com/2021/day/3#part1

const { gamma, epsilon } = R.pipe(
  () => diagnosticReport,
  bitCounter,
  R.map(({ zeroes, ones }) => (zeroes > ones ? ["0", "1"] : ["1", "0"])),
  R.transpose,
  R.map(R.join("")),
  ([gamma, epsilon]) => ({
    gamma: parseInt(gamma, 2),
    epsilon: parseInt(epsilon, 2),
  })
)();

const powerConsumption = gamma * epsilon;

// https://adventofcode.com/2021/day/3#part2

const calcSolutionPart2 = (
  report: string[][],
  type: "oxygen" | "scrubber",
  bitIndex = 0
): number => {
  if (R.length(report) === 1) {
    return R.pipe(
      () => report,
      R.head,
      R.join(""),
      (str) => parseInt(str, 2)
    )();
  }

  const { zeroes, ones } = bitCounter(report)[bitIndex];

  const { most, least } = (() => {
    if (zeroes > ones) {
      return { most: "0", least: "1" };
    } else if (zeroes < ones) {
      return { most: "1", least: "0" };
    }
    return { most: undefined, least: undefined };
  })();

  return R.pipe(
    () => report,
    R.filter((row: string[]) => {
      if (type === "oxygen") {
        return most ? row[bitIndex] === most : row[bitIndex] === "1";
      } else {
        return least ? row[bitIndex] === least : row[bitIndex] === "0";
      }
    }),
    (filtered) => calcSolutionPart2(filtered, type, bitIndex + 1)
  )();
};

const oxygen = calcSolutionPart2(diagnosticReport, "oxygen");
const scrubber = calcSolutionPart2(diagnosticReport, "scrubber");

const lifeSupport = oxygen * scrubber;

assert.strictEqual(gamma, 177);
assert.strictEqual(epsilon, 3918);
assert.strictEqual(powerConsumption, 693486);
assert.strictEqual(oxygen, 933);
assert.strictEqual(scrubber, 3622);
assert.strictEqual(lifeSupport, 3379326);

console.log({
  gamma,
  epsilon,
  powerConsumption,
  oxygen,
  scrubber,
  lifeSupport,
});
