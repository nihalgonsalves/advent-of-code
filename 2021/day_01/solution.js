const R = require("ramda");

const { getInputLines } = require("../getInputLines");

// https://adventofcode.com/2021/day/1

const values = getInputLines("01").map((line) => parseInt(line, 10));

// count the number of times a depth measurement increases from the previous measurement

const solutionPart1 = R.pipe(
  R.aperture(2),
  R.filter(([prev, current]) => prev < current),
  R.length
)(values);

// count the number of times the sum of measurements in this sliding window (3)
// increases from the previous sum

const solutionPart2 = R.pipe(
  R.aperture(3),
  R.map(R.sum),
  R.aperture(2),
  R.filter(([prev, current]) => prev < current),
  R.length
)(values);

console.log({ solutionPart1, solutionPart2 });
