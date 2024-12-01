import * as R from "ramda";

const waysToWin = (timeMs: number, distanceRecordMm: number) =>
	Array.from({ length: timeMs - 1 }, (_, i) => i + 1).reduce(
		(sum, timeHeldMs) => {
			// 1 m/s for each ms held
			const speedMs = timeHeldMs * 1;
			const distanceMm = speedMs * (timeMs - timeHeldMs);
			if (distanceMm > distanceRecordMm) {
				return sum + 1;
			}
			return sum;
		},
		0,
	);

export const run1 = (input: string[]): number => {
	const [time, distance] = input;

	const times = time
		.split(/\s+/)
		.slice(1)
		.map((x) => parseInt(x, 10));
	const distances = distance
		.split(/\s+/)
		.slice(1)
		.map((x) => parseInt(x, 10));

	const races = R.zip(times, distances);

	return races.reduce((acc, [timeMs, distanceRecordMm]) => {
		return acc * waysToWin(timeMs, distanceRecordMm);
	}, 1);
};

export const run2 = (input: string[]): number => {
	const [times, distances] = input;

	const time = parseInt([...times.matchAll(/\d/g)].join(""), 10);
	const distance = parseInt([...distances.matchAll(/\d/g)].join(""), 10);

	return waysToWin(time, distance);
};
