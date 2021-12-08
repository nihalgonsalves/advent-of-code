import fs from "fs";
import path from "path";

export const getInputLines = (day: string): string[] => {
  const input = fs.readFileSync(
    path.join(__dirname, `./day_${day}/input.txt`),
    "utf8"
  );

  return input.split("\n").filter((line) => line !== "");
};
