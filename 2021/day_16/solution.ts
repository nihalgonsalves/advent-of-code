import assert from "assert";
import * as R from "ramda";

import { getInputLines } from "../../getInputLines";

const [rawInput] = await getInputLines(import.meta.url);

const initialInput = rawInput
  .split("")
  .map((char) => parseInt(char, 16).toString(2).padStart(4, "0"))
  .join("");

const versions: number[] = [];

const operators: Record<number, (operands: number[]) => number> = {
  0: R.sum,
  1: R.product,
  2: (values) => Math.min(...values),
  3: (values) => Math.max(...values),
  5: ([a, b]) => (a > b ? 1 : 0),
  6: ([a, b]) => (a < b ? 1 : 0),
  7: ([a, b]) => (a == b ? 1 : 0),
};

const readPacket = (
  input = initialInput,
  packetReadLimit = Infinity,
): { literals: number[]; buffer: string } => {
  let buffer = input;

  const readChars = (len: number) => {
    const readValue = buffer.slice(0, len);
    buffer = buffer.slice(len);
    return readValue;
  };

  const literals: number[] = [];

  let readPackets = 0;

  while (buffer.length > 6 && readPackets < packetReadLimit) {
    readPackets += 1;

    const version = parseInt(readChars(3), 2);
    const typeID = parseInt(readChars(3), 2);

    versions.push(version);

    if (typeID === 4) {
      let literalBuffer = "";

      while (buffer.length >= 5) {
        const groupIdentifier = readChars(1);
        literalBuffer += readChars(4);

        if (groupIdentifier === "0") {
          // Last group, continue to next packet
          break;
        }
      }

      literals.push(parseInt(literalBuffer, 2));
    } else {
      const lengthTypeID = readChars(1);

      if (lengthTypeID === "0") {
        const subPacketsLength = parseInt(readChars(15), 2);

        const { literals: newLiterals } = readPacket(
          readChars(subPacketsLength),
        );

        literals.push(operators[typeID](newLiterals));
      } else {
        const numSubPackets = parseInt(readChars(11), 2);

        const { literals: newLiterals, buffer: remainingBuffer } = readPacket(
          buffer,
          numSubPackets,
        );

        literals.push(operators[typeID](newLiterals));
        buffer = remainingBuffer;
      }
    }
  }

  return { literals, buffer };
};

const { literals } = readPacket();

// Part 1

const versionSum = R.sum(versions);

// Part 2

const [finalValue] = literals;

// Solution

assert.strictEqual(versionSum, 934);
assert.strictEqual(finalValue, 912901337844);

console.log({ versionSum, finalValue });
