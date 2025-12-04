type Cell = {
	rowIndex: number;
	colIndex: number;
	occupied: boolean;
};

const getNeighbors = (matrix: Cell[][], rowIndex: number, colIndex: number) => {
	return [
		// N
		matrix[rowIndex - 1]?.[colIndex],
		// NE:
		matrix[rowIndex - 1]?.[colIndex + 1],
		// E
		matrix[rowIndex]?.[colIndex + 1],
		// SE:
		matrix[rowIndex + 1]?.[colIndex + 1],
		// S
		matrix[rowIndex + 1]?.[colIndex],
		// SW:
		matrix[rowIndex + 1]?.[colIndex - 1],
		// W
		matrix[rowIndex]?.[colIndex - 1],
		// NW:
		matrix[rowIndex - 1]?.[colIndex - 1],
	].filter((cell) => cell !== undefined);
};

const canBeRemoved = (matrix: Cell[][], rowIndex: number, colIndex: number) =>
	getNeighbors(matrix, rowIndex, colIndex).filter(
		(neighbor) => neighbor.occupied,
	).length < 4;

const getMatrix = (input: string[]): Cell[][] =>
	input.map((line, rowIndex) =>
		line.split("").map((char, colIndex) => ({
			rowIndex,
			colIndex,
			occupied: char === "@",
		})),
	);

export const run1 = (input: string[]): number => {
	const matrix = getMatrix(input);

	return matrix
		.flat()
		.filter(
			(cell) =>
				cell.occupied && canBeRemoved(matrix, cell.rowIndex, cell.colIndex),
		).length;
};

export const run2 = (input: string[]): number => {
	const matrix = getMatrix(input);

	let totalRemovedRolls = 0;

	while (true) {
		let removedRolls = 0;

		for (const row of matrix) {
			for (const cell of row) {
				if (!cell.occupied) {
					continue;
				}

				if (canBeRemoved(matrix, cell.rowIndex, cell.colIndex)) {
					removedRolls += 1;
					cell.occupied = false;
				}
			}
		}

		if (removedRolls === 0) {
			break;
		} else {
			totalRemovedRolls += removedRolls;
		}
	}

	return totalRemovedRolls;
};
