import * as R from "ramda";

type Spring = "#" | ".";
type Value = "?" | "#" | ".";

const parseInput = (input: string[]) => {
  return input.map((line) => {
    const [springsStr, configStr] = line.split(" ");

    return {
      springs: springsStr.split("") as Value[],
      config: configStr.split(",").map((c) => parseInt(c, 10)),
    };
  });
};

const permutationsForLength: Map<number, Spring[][]> = new Map();

export const permutations = (count: number): Spring[][] => {
  const cachedValue = permutationsForLength.get(count);
  if (cachedValue) {
    return cachedValue;
  }

  const result =
    count === 0
      ? [[]]
      : permutations(count - 1).flatMap((springs) => [
          ["#" as const, ...springs],
          ["." as const, ...springs],
        ]);

  permutationsForLength.set(count, result);

  return result;
};

const isValidSpring = (spring: Spring[], config: number[]) => {
  const brokenGroups = R.groupWith((a, b) => a === b, spring).filter(
    (group) => group[0] === "#",
  );

  return (
    brokenGroups.length === config.length &&
    config.every((count, i) => brokenGroups[i].length === count)
  );
};

export const run1 = (input: string[]): number => {
  return parseInput(input).reduce((sum, { springs, config }) => {
    const unknownValues = springs.filter((val) => val === "?").length;

    const allPermutations = permutations(unknownValues);

    const validSpringSize = allPermutations.reduce<number>(
      (lineSum, permutations) => {
        const p = [...permutations];

        const springPermutation = springs.map((spring) => {
          if (spring === "?") {
            return p.pop()!;
          }

          return spring;
        });

        if (isValidSpring(springPermutation, config)) {
          return lineSum + 1;
        }

        return lineSum;
      },
      0,
    );

    return sum + validSpringSize;
  }, 0);
};

export const run2 = (input: string[]): number => {
  return 0;
};
