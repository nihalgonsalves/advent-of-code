type Coord = {
	x: number;
	y: number;
};

const CellType = {
	START: "S",
	EMPTY: ".",
	SPLITTER: "^",
} as const;

type Cell = Coord & {
	type: (typeof CellType)[keyof typeof CellType];
};

const parseInput = (input: string[]) => {
	let start: Coord | undefined;

	const manifold = input.map((line, y) =>
		line.split("").map((char, x): Cell => {
			const coord = { x, y };

			if (char === "^") {
				return { x, y, type: CellType.SPLITTER };
			}

			if (char === "S") {
				start = coord;
			}

			return { x, y, type: CellType.EMPTY };
		}),
	);

	if (!start) {
		throw new Error("Start not found");
	}

	return { start, manifold };
};

const coordKey = ({ x, y }: Coord): CoordKey => `${x},${y}`;
type CoordKey = `${number},${number}`;

export const run1 = (input: string[]): number => {
	const { start, manifold } = parseInput(input);

	const beam = new Set<CoordKey>();
	const splitPoints = new Map<CoordKey, Coord>();

	const emit = (tachyon: Coord) => {
		if (beam.has(coordKey(tachyon))) {
			return;
		}

		beam.add(coordKey(tachyon));

		const nextCell = manifold.at(tachyon.y + 1)?.at(tachyon.x);

		if (nextCell?.type === CellType.SPLITTER) {
			splitPoints.set(coordKey(nextCell), nextCell);
			emit({ y: nextCell.y, x: nextCell.x - 1 });
			emit({ y: nextCell.y, x: nextCell.x + 1 });
		} else if (nextCell?.type === CellType.EMPTY) {
			emit(nextCell);
		}
	};

	emit(start);

	return splitPoints.size;
};

export const run2 = (_input: string[]): number => {
	return 0;
};
