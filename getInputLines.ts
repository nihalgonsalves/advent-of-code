import fs from "fs";

export const getInputLines = async (base: string): Promise<string[]> => {
  const input = await fs.promises.readFile(
    new URL(`./input.txt`, base),
    "utf8"
  );

  return input.split("\n").filter((line) => line !== "");
};

export const time = <T>(name: string, fn: () => T): T => {
  console.time(name);
  const result = fn();
  console.timeEnd(name);
  return result;
};
