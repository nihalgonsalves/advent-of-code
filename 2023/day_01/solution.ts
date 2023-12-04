const findDigit = (line: string[]) => line.find((char) => char.match(/^\d$/));

export const run1 = (input: string[]): number => {
  return input
    .map((line) => {
      return parseInt(
        [
          // break
          findDigit([...line]),
          findDigit([...line].reverse()),
        ].join(""),
        10
      );
    })
    .reduce((sum, num) => sum + num, 0);
};

const mapping: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const digits = Object.keys(mapping);

export const run2 = (input: string[]): number => {
  const result = input
    .map((line) => {
      let a = "";
      let b = "";

      const write = (char: string) => {
        if (!a) {
          a = char;
          b = char;
        } else {
          b = char;
        }
      };

      let buffer = "";

      for (const char of line) {
        if (char.match(/^\d$/)) {
          write(char);
        } else {
          buffer += char;
          // endsWith because we greedy match backwards
          const spelled = digits.find((d) => buffer.endsWith(d));
          const digit = spelled ? mapping[spelled] : undefined;
          if (digit) {
            write(digit);
          }
        }
      }

      return parseInt([a, b].join(""), 10);
    })
    .reduce((sum, num) => sum + num, 0);

  return result;
};
