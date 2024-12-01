export const readCharAt = (input: string[], line: number, index: number) => ({
	line: line,
	index,
	value: input[line]?.[index] as string | undefined,
});

export const readSymbolsAround = (
	input: string[],
	line: number,
	index: number,
	predicate = (char: string) => char !== "." && !char.match(/^\d$/),
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
	].filter((val) => val?.value !== undefined && predicate(val.value));

export const run1 = (input: string[]): number => {
	return input
		.flatMap((line, lineI) => {
			let buffer = "";
			let touches = false;

			const numbers: number[] = [];

			const evalBuffer = () => {
				if (buffer && touches) {
					numbers.push(Number.parseInt(buffer, 10));
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

export const run2 = (input: string[]): number => {
	// key by gear index `i.j`
	const gearMap: Record<string, number[]> = {};

	input.forEach((line, lineI) => {
		let buffer = "";
		let touchesAt = "";

		const evalBuffer = () => {
			if (buffer && touchesAt) {
				gearMap[touchesAt] ??= [];
				gearMap[touchesAt].push(Number.parseInt(buffer, 10));
			}

			buffer = "";
			touchesAt = "";
		};

		line.split("").map((char, charI) => {
			if (char.match(/^\d$/)) {
				buffer += char;
				if (!touchesAt) {
					const symbols = readSymbolsAround(
						input,
						lineI,
						charI,
						(char) => char === "*",
					);
					if (symbols?.[0]) {
						touchesAt = `${symbols[0].line}.${symbols[0].index}`;
					}
				}
			} else {
				evalBuffer();
			}
		});

		// once more if there's a number at the end of the line
		evalBuffer();
	});

	return Object.values(gearMap)
		.filter((gears) => gears.length === 2)
		.map(([a, b]) => a * b)
		.reduce((a, b) => a + b, 0);
};
