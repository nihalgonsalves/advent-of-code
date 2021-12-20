import assert from "assert";
import R from "ramda";

import { getInputLines } from "../getInputLines";

const [rawInput] = getInputLines("16");

const input = rawInput
  .split("")
  .map((char) => parseInt(char, 16).toString(2).padStart(4, "0"))
  .join("");

let buffer = input;

const getChars = (len: number) => {
  const readValue = buffer.slice(0, len);
  buffer = buffer.slice(len);
  return readValue;
};

const versions: number[] = [];

while (buffer.length > 6) {
  const version = parseInt(getChars(3), 2);
  const typeID = parseInt(getChars(3), 2);

  versions.push(version);

  if (typeID === 4) {
    let literalBuffer = "";

    while (buffer.length >= 5) {
      const groupIdentifier = getChars(1);
      literalBuffer += getChars(4);

      if (groupIdentifier === "0") {
        // Last group, continue to next packet
        break;
      }
    }

    const literal = parseInt(literalBuffer, 2);
  } else {
    const lengthTypeID = getChars(1);

    if (lengthTypeID === "0") {
      const subPacketsLength = parseInt(getChars(15), 2);
    } else {
      const numSubPackets = parseInt(getChars(11), 2);
    }
  }
}

// Part 1

const versionSum = R.sum(versions);

// Solution

assert.strictEqual(versionSum, 934);

console.log({ versionSum });
