import { getInputLines } from "../../getInputLines";

export const readCharAt = (
  input: string[],
  line: number,
  index: number
): string | undefined => input[line]?.[index];

export const readSymbolsAround = (
  input: string[],
  line: number,
  index: number
) =>
  [
    // top left
    readCharAt(input, line - 1, index - 1),
    // top
    readCharAt(input, line - 1, index),
    // top right
    readCharAt(input, line - 1, index + 1),
    // right
    readCharAt(input, line, index + 1),
    // bottom right
    readCharAt(input, line + 1, index + 1),
    // bottom
    readCharAt(input, line + 1, index),
    // bottom left
    readCharAt(input, line + 1, index - 1),
    // left
    readCharAt(input, line, index - 1),
  ].filter((char) => char !== undefined && char !== "." && !char.match(/^\d$/));

export const run1 = (input: string[]) => {
  return input
    .flatMap((line, lineI) => {
      let buffer = "";
      let touches = false;

      const numbers: number[] = [];

      const evalBuffer = () => {
        if (buffer && touches) {
          numbers.push(parseInt(buffer, 10));
        }

        buffer = "";
        touches = false;
      };

      line.split("").map((char, charI) => {
        if (char.match(/^\d$/)) {
          buffer += char;
          if (!touches) {
            touches = readSymbolsAround(input, lineI, charI).length > 0;
          }
        } else {
          evalBuffer();
        }
      });

      // once more if there's a number at the end of the line
      evalBuffer();

      return numbers;
    })
    .reduce((a, b) => a + b, 0);
};
