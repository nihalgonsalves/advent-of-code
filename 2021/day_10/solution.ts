import assert from "assert";
import R from "ramda";

import { getInputLines } from "../getInputLines";

const lines = getInputLines("10").map((line) => line.split(""));

const symbols: Record<string, string> = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

const closingSymbols = Object.keys(symbols);
const openingSymbols = Object.values(symbols);

const syntaxErrorScore: Record<string, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const errorScore = R.sum(
  lines.map((line) => {
    const stack: string[] = [];

    for (const sym of line) {
      if (openingSymbols.includes(sym)) {
        stack.push(sym);
      } else if (closingSymbols.includes(sym) && stack.pop() !== symbols[sym]) {
        return syntaxErrorScore[sym];
      }
    }

    return 0;
  })
);

// Solution

assert.strictEqual(errorScore, 341823);

console.log(errorScore);
