type Robot = {
	p: { x: number; y: number };
	v: { x: number; y: number };
};

const parseInput = (input: string[]): Robot[] => {
	return input.map((input) => {
		const matches = /p=(?<px>\d+),(?<py>\d+) v=(?<vx>-?\d+),(?<vy>-?\d+)/.exec(
			input,
		);

		if (!matches?.groups) {
			throw new Error("Invalid input");
		}

		return {
			p: {
				x: Number.parseInt(matches.groups.px, 10),
				y: Number.parseInt(matches.groups.py, 10),
			},
			v: {
				x: Number.parseInt(matches.groups.vx, 10),
				y: Number.parseInt(matches.groups.vy, 10),
			},
		};
	});
};

const getQuadrants = (width: number, height: number) => ({
	topLeft: {
		x: [0, (width - 1) / 2 - 1],
		y: [0, (height - 1) / 2 - 1],
	},
	bottomLeft: {
		x: [0, (width - 1) / 2 - 1],
		y: [(height - 1) / 2 + 1, height - 1],
	},
	topRight: {
		x: [(width - 1) / 2 + 1, width - 1],
		y: [0, (height - 1) / 2 - 1],
	},
	bottomRight: {
		x: [(width - 1) / 2 + 1, width - 1],
		y: [(height - 1) / 2 + 1, height - 1],
	},
});

const moveRobotsOnce = (robots: Robot[], width: number, height: number) => {
	for (const robot of robots) {
		robot.p.x += robot.v.x;
		robot.p.y += robot.v.y;

		if (robot.p.x > width - 1) {
			robot.p.x -= width;
		} else if (robot.p.x < 0) {
			robot.p.x += width;
		}

		if (robot.p.y > height - 1) {
			robot.p.y -= height;
		} else if (robot.p.y < 0) {
			robot.p.y += height;
		}
	}
};

const getCountMap = (robots: Robot[]) => {
	const map = new Map<string, number>();
	for (const robot of robots) {
		map.set(
			`${robot.p.x},${robot.p.y}`,
			(map.get(`${robot.p.x},${robot.p.y}`) ?? 0) + 1,
		);
	}
	return map;
};

export const run1 = (
	input: string[],
	width: number,
	height: number,
): number => {
	const robots = parseInput(input);

	for (const _ of Array.from({ length: 100 })) {
		moveRobotsOnce(robots, width, height);
	}

	const countMap = getCountMap(robots);

	return Object.values(getQuadrants(width, height))
		.map((quadrant) => {
			let count = 0;

			for (let iY = quadrant.y[0]; iY <= quadrant.y[1]; iY++) {
				for (let iX = quadrant.x[0]; iX <= quadrant.x[1]; iX++) {
					count += countMap.get(`${iX},${iY}`) ?? 0;
				}
			}

			return count;
		})
		.reduce((acc, count) => acc * count, 1);
};

const range0toN = (n: number) => Array.from({ length: n }, (_, i) => i);

export const run2 = (
	input: string[],
	width: number,
	height: number,
): number => {
	const robots = parseInput(input);
	let seconds = 0;

	while (true) {
		seconds++;
		moveRobotsOnce(robots, width, height);
		const countMap = getCountMap(robots);

		if (Math.max(...countMap.values()) === 1) {
			if (process.env.PRINT) {
				for (const y of range0toN(height)) {
					for (const x of range0toN(width)) {
						process.stdout.write(`${countMap.get(`${x},${y}`) ?? "."}`);
					}
					process.stdout.write("\n");
				}
			}

			return seconds;
		}
	}
};
