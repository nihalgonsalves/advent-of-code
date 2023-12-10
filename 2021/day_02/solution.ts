import assert from "assert";
import * as R from "ramda";
import { getInputLines } from "../../getInputLines";

// https://adventofcode.com/2021/day/2

const commands = (await getInputLines(import.meta.url)).map((line) => {
  const [direction, magnitude] = line.split(" ");

  return { direction, magnitude: parseInt(magnitude, 10) };
});

// Part 1

const solutionPart1 = R.reduce(
  ({ position, depth }, { direction, magnitude }) => {
    switch (direction) {
      case "forward":
        return { position: position + magnitude, depth };
      case "up":
        return { position, depth: depth - magnitude };
      case "down":
        return { position, depth: depth + magnitude };
      default:
        return { position, depth };
    }
  },
  { position: 0, depth: 0 },
  commands,
);

const multipliedPart1 = solutionPart1.position * solutionPart1.depth;

assert.strictEqual(multipliedPart1, 1694130);

// Part 2

const solutionPart2 = R.reduce(
  ({ position, depth, aim }, { direction, magnitude }) => {
    switch (direction) {
      case "forward":
        return {
          position: position + magnitude,
          depth: depth + aim * magnitude,
          aim,
        };
      case "up":
        return { position, depth, aim: aim - magnitude };
      case "down":
        return { position, depth, aim: aim + magnitude };
      default:
        return { position, depth, aim };
    }
  },
  { position: 0, depth: 0, aim: 0 },
  commands,
);

const multipliedPart2 = solutionPart2.position * solutionPart2.depth;

assert.strictEqual(multipliedPart2, 1698850445);

//

console.log({ solutionPart1, multipliedPart1, solutionPart2, multipliedPart2 });
