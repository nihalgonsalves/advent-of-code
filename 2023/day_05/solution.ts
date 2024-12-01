import * as R from "ramda";

const maps = [
	"seed-to-soil",
	"soil-to-fertilizer",
	"fertilizer-to-water",
	"water-to-light",
	"light-to-temperature",
	"temperature-to-humidity",
	"humidity-to-location",
] as const;

type MapItem = (typeof maps)[number];

const assertNonNullOrUndefined = <T>(value: T): NonNullable<T> => {
	if (value == null) {
		throw new Error("Value is null or undefined");
	}

	return value;
};

type Range = { start: number; endInclusive: number };
type TranslatingRange = Range & { destinationOffset: number };

const parseInput = (input: string[]) => {
	const [seedsStr, ...mapsStr] = input;

	const seeds = seedsStr
		.split(/:?\s+/)
		.slice(1)
		.map((seed) => Number.parseInt(seed, 10));

	const map = new Map<MapItem, Array<TranslatingRange>>(
		maps.map((map) => [map, []]),
	);

	let mapCursor: MapItem | null = null;

	for (const line of mapsStr) {
		if (!line) {
			mapCursor = null;
			continue;
		}

		const mappingItem = maps.find((map) => line.startsWith(`${map} map:`));
		if (mappingItem) {
			mapCursor = mappingItem;
			continue;
		}

		if (!mapCursor) {
			throw new Error(`Error scanning input: ${line}`);
		}

		const [destinationStr, sourceStr, rangeStr] = line.split(/\s+/);

		const source = Number.parseInt(sourceStr, 10);
		const destination = Number.parseInt(destinationStr, 10);
		const length = Number.parseInt(rangeStr, 10);

		assertNonNullOrUndefined(map.get(mapCursor)).push({
			start: source,
			endInclusive: source + length - 1,
			destinationOffset: destination - source,
		});
	}

	return { seeds, map };
};

export const rangeIntersection = <T extends Range, U extends Range>(
	a: T,
	b: U,
): (T & U) | undefined => {
	const maxStart = Math.max(a.start, b.start);
	const minEndInclusive = Math.min(a.endInclusive, b.endInclusive);

	if (maxStart <= minEndInclusive) {
		return { ...a, ...b, start: maxStart, endInclusive: minEndInclusive };
	}

	return undefined;
};

export const run1 = (input: string[]): number => {
	const { seeds, map } = parseInput(input);

	const locations = seeds.map((seed) =>
		maps.reduce<number>((position, mapItem) => {
			const destinationOffset = map
				.get(mapItem)!
				.find(
					({ start, endInclusive }) =>
						start <= position && position <= endInclusive,
				)?.destinationOffset;

			if (destinationOffset) {
				return position + destinationOffset;
			}

			return position;
		}, seed),
	);

	return Math.min(...locations);
};

// mappings are assumed to be non-overlapping and sorted
export const splitRange = (inputRange: Range, mappings: TranslatingRange[]) => {
	const intersectingRanges: TranslatingRange[] = [];

	for (const mapRange of mappings) {
		const intersection = rangeIntersection(inputRange, mapRange);
		if (intersection) {
			intersectingRanges.push(intersection);
		}
	}

	// range:       |----------**********----------|
	// (a) within:  |-----------*******------------| -> constrain to smaller range (intersection)
	// (b) h-left:  |--------*****-----------------| -> split into two ranges (left gap, intersection)
	// (c) h-right: |-----------------*****--------| -> split into two ranges (intersection, right gap)
	// (d) left:    |-**---------------------------| -> keep (no translation)
	// (e) right:   |---------------------------**-| -> keep (no translation)

	// case (d) or (e)
	if (intersectingRanges.length === 0) {
		return [inputRange];
	}

	// if there are intersection ranges, split them to the minimum set of ranges covering the entire original range,
	// filling in with untranslated values if no intersection covers it.
	//
	// for example, intersections marked as []:
	// 1 [2 3] 4 [5 6] 7 8 [9 10 11] 12
	//
	// we want the ranges:
	// 1..1, 2..3, 4..4, 5..6, 7..8, 9..11, 12..12

	// case (b)
	const leftRange =
		inputRange.start === intersectingRanges.at(0)!.start
			? []
			: [
					{
						start: inputRange.start,
						endInclusive: intersectingRanges.at(0)!.start - 1,
						destinationOffset: 0,
					},
				];

	// special case (c), for the rest see gap fill below
	const rightRange =
		inputRange.endInclusive === intersectingRanges.at(-1)!.endInclusive
			? []
			: [
					{
						start: intersectingRanges.at(-1)!.endInclusive + 1,
						endInclusive: inputRange.endInclusive,
						destinationOffset: 0,
					},
				];

	const intersectingWithGapFill = intersectingRanges.flatMap(
		(intersectingRange, i) => {
			const offsetRange = {
				start: intersectingRange.start + intersectingRange.destinationOffset,
				endInclusive:
					intersectingRange.endInclusive + intersectingRange.destinationOffset,
				destinationOffset: 0,
			};

			// case (c)
			// if we're not at the end, and the next range is not directly after, add a new range for the gap
			if (
				i < intersectingRanges.length - 1 &&
				intersectingRanges[i + 1].start !== intersectingRange.endInclusive + 1
			) {
				return [
					offsetRange,
					{
						start: intersectingRange.endInclusive + 1,
						endInclusive: intersectingRanges[i + 1].start - 1,
						destinationOffset: 0,
					},
				];
			}

			return offsetRange;
		},
	);

	return [...leftRange, ...intersectingWithGapFill, ...rightRange];
};

export const run2 = (input: string[]): number => {
	const { seeds: seedPairs, map } = parseInput(input);

	const pairs = (
		R.splitEvery(2, seedPairs) as [start: number, length: number][]
	).map<Range>(([start, length]) => ({
		start,
		endInclusive: start + length - 1,
	}));

	let minLocation = Number.POSITIVE_INFINITY;

	for (const pair of pairs) {
		const finalRanges = maps.reduce(
			(ranges, mapItem) =>
				ranges.flatMap((range) =>
					splitRange(
						range,
						map.get(mapItem)!.sort((a, b) => a.start - b.start),
					),
				),
			[pair],
		);

		const min = Math.min(...finalRanges.map(({ start }) => start));
		if (min < minLocation) {
			minLocation = min;
		}
	}

	return minLocation;
};
