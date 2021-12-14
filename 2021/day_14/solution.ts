import assert from "assert";
import R from "ramda";

import { getInputLines } from "../getInputLines";

const [rawTemplate, ...rawRules] = getInputLines("14");

const template = rawTemplate.split("");
const rules = Object.fromEntries(
  rawRules.map((rawRule) => rawRule.split(" -> ") as [string, string])
);

const pass = (template: string[]) =>
  template.flatMap((a, i) =>
    template[i + 1] ? [a, rules[`${a}${template[i + 1]}`]] : [a]
  );

const applyN = <T>(n: number, initialValue: T, fn: (i: T) => T): T =>
  Array.from<never>({ length: n }).reduce((t) => fn(t), initialValue);

const getCountResult = (polymer: string[]) => {
  const counts = R.pipe(
    () => polymer,
    R.countBy(R.identity),
    R.toPairs,
    R.sortBy<[string, number]>(([_, count]) => count),
    R.map(([_, count]) => count)
  )();

  return R.last(counts)! - R.head(counts)!;
};

// Part 1

const after10Steps = applyN(10, template, pass);
const part1 = getCountResult(after10Steps);

// Solution

assert.strictEqual(part1, 2740);

console.log({ part1 });
