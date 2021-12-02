const fs = require("fs");
const path = require("path");

export const getInputLines = (day: string): string[] => {
  const input = fs.readFileSync(
    path.join(__dirname, `./day_${day}/input.txt`),
    "utf8"
  );

  return input.split("\n");
};
