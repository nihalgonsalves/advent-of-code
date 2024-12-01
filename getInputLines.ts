import fs from "node:fs";

export const getInput = (base: string) =>
	fs.promises.readFile(new URL("./input.txt", base), "utf8");

export const getInputLines = async (base: string): Promise<string[]> => {
	return (await getInput(base)).split("\n").filter((line) => line !== "");
};

export const time = <T>(name: string, fn: () => T): T => {
	console.time(name);
	const result = fn();
	console.timeEnd(name);
	return result;
};
