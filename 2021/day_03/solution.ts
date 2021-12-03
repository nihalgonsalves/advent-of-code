import assert from "assert";
import R from "ramda";

import { getInputLines } from "../getInputLines";

const solutionPart1 = R.pipe(
  R.map(R.split("")),
  R.transpose,
  R.map(R.partition((el) => el === "0")),
  R.map(([zeroes, ones]) => (zeroes.length > ones.length ? [0, 1] : [1, 0])),
  R.transpose,
  R.map(R.join("")),
  ([gamma, epsilon]) => ({
    gamma: parseInt(gamma, 2),
    epsilon: parseInt(epsilon, 2),
  })
)(getInputLines("03"));

const powerConsumptionPart1 = solutionPart1.gamma * solutionPart1.epsilon;

console.log({ solutionPart1, powerConsumptionPart1 });

assert.equal(powerConsumptionPart1, 693486);
