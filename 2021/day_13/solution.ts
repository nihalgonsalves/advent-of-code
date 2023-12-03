import assert from "assert";
import * as R from "ramda";

import { getInputLines } from "../../getInputLines";

const [rawFolds, rawDots] = R.partition(
  (line) => line.startsWith("fold"),
  await getInputLines(import.meta.url)
);

type Dot = { x: number; y: number };

const dots: Dot[] = rawDots.map((dot) => {
  const [x, y] = dot.split(",").map((s) => parseInt(s, 10));
  return { x, y };
});

type Fold = { axis: "x" | "y"; value: number };

const folds: Fold[] = rawFolds.map((fold) => {
  const [axis, rawValue] = fold.replace("fold along ", "").split("=");
  return { axis: axis as "x" | "y", value: parseInt(rawValue, 10) };
});

const getTransformer =
  (foldAt: number) =>
  (val: number): number => {
    if (val < foldAt) {
      return val;
    }

    return val - 2 * (val - foldAt);
  };

const fold = (dots: Dot[], fold: Fold): Dot[] => {
  const transformX =
    fold.axis === "x" ? getTransformer(fold.value) : R.identity;
  const transformY =
    fold.axis === "y" ? getTransformer(fold.value) : R.identity;

  return dots.map(({ x, y }) => ({
    x: transformX(x),
    y: transformY(y),
  }));
};

// Part 1

const [firstFold, ...otherFolds] = folds;
const foldedOnce = fold(dots, firstFold);
const dotCountAfterFirstFold = R.uniq(foldedOnce).length;

// Part 2

// Transposed since the letter output appears that way
const transposedMatrix: boolean[][] = [];

R.uniq(
  otherFolds.reduce((dots, currentFold) => fold(dots, currentFold), foldedOnce)
).forEach(({ x, y }) => {
  transposedMatrix[y] ??= [];
  transposedMatrix[y][x] = true;
});

// Spread to fill in sparse arrays
[...transposedMatrix].forEach((line) =>
  console.log([...line].map((v) => (v ? "#" : ".")).join(" "))
);

// Solution

assert.strictEqual(dotCountAfterFirstFold, 710);

console.log({ dotCountAfterFirstFold });
