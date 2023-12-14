const toMatrix = (input: string[]) => input.map((line) => line.split(""));

export const run1 = (input: string[]): number => {
  const matrix = toMatrix(input);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] !== "O") {
        continue;
      }

      let cursor = i;

      while (0 < cursor && matrix[cursor - 1][j] === ".") {
        matrix[cursor - 1][j] = "O";
        matrix[cursor][j] = ".";

        cursor--;
      }
    }
  }

  const sum = matrix.reduce(
    (acc, line, index) =>
      acc +
      (matrix.length - index) * line.filter((char) => char === "O").length,
    0,
  );

  return sum;
};

export const run2 = (input: string[]): number => {
  return 0;
};
