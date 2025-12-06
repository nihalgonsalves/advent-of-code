import fs from "node:fs";

export const getInput = (base: string) =>
	fs.promises.readFile(new URL("./input.txt", base), "utf8");

export const getInputLines = async (base: string): Promise<string[]> => {
	return (await getInput(base)).split("\n").filter((line) => line !== "");
};
