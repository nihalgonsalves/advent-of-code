import chalk from "chalk";
import * as R from "ramda";

const parseInput = (input: string) => {
  return input
    .split("\n\n")
    .map((patternStr) => patternStr.split("\n").map((char) => char.split("")));
};

const matrixEqual = (a: string[][], b: string[][]) =>
  JSON.stringify(a) === JSON.stringify(b);

const findReflectedIndex = (
  pattern: string[][],
  ignoreIndex: number | undefined,
): number | undefined => {
  for (let i = 1; i < pattern.length; i++) {
    if (i === ignoreIndex) {
      continue;
    }

    const upReversed = pattern.slice(0, i).reverse();
    const down = pattern.slice(i);

    const reflectionLength = Math.min(upReversed.length, down.length);

    if (
      matrixEqual(
        upReversed.slice(0, reflectionLength),
        down.slice(0, reflectionLength),
      )
    ) {
      return i;
    }
  }
};

const findReflectionValue = (
  pattern: string[][],
  ignoreValue: number | undefined = undefined,
): number | undefined => {
  const reflectedRow = findReflectedIndex(
    pattern,
    ignoreValue ? ignoreValue / 100 : undefined,
  );
  if (reflectedRow) {
    return reflectedRow * 100;
  }

  const reflectedColumn = findReflectedIndex(R.transpose(pattern), ignoreValue);
  if (reflectedColumn) {
    return reflectedColumn;
  }
};

export const run1 = (input: string): number => {
  const pattterns = parseInput(input);

  const sums = pattterns.map((pattern) => {
    const sum = findReflectionValue(pattern);
    if (sum === undefined) {
      throw new Error("No reflection found");
    }
    return sum;
  });

  return R.sum(sums);
};

export const run2 = (input: string): number => {
  const pattterns = parseInput(input);

  const sums = pattterns.map((pattern, i) => {
    const originalReflection = findReflectionValue(pattern);

    for (let i = 0; i < pattern.length; i++) {
      for (let j = 0; j < pattern[i].length; j++) {
        const newPattern = R.clone(pattern);
        newPattern[i][j] = newPattern[i][j] === "#" ? "." : "#";

        const reflection = findReflectionValue(newPattern, originalReflection);
        if (reflection !== undefined && reflection !== originalReflection) {
          return reflection;
        }
      }
    }

    throw new Error("No alternative reflection found");
  });

  return R.sum(sums);
};
