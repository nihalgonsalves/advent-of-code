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

const parseInput = (input: string[]) => {
  const [seedsStr, ...mapsStr] = input;

  const seeds = seedsStr
    .split(/:?\s+/)
    .slice(1)
    .map((seed) => parseInt(seed, 10));

  const map = new Map(
    maps.map((map) => [
      map,
      [] as {
        sourceStart: number;
        sourceEnd: number;
        destinationOffset: number;
      }[],
    ])
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

    const source = parseInt(sourceStr, 10);
    const destination = parseInt(destinationStr, 10);
    const length = parseInt(rangeStr, 10);

    assertNonNullOrUndefined(map.get(mapCursor)).push({
      sourceStart: source,
      sourceEnd: source + length,
      destinationOffset: destination - source,
    });
  }

  return { seeds, map };
};

const reduceLocationAcrossMaps =
  (map: ReturnType<typeof parseInput>["map"]) => (seed: number) =>
    maps.reduce<number>((position, mapItem) => {
      const destinationOffset = map
        .get(mapItem)!
        .find(
          ({ sourceStart, sourceEnd }) =>
            sourceStart <= position && position <= sourceEnd
        )?.destinationOffset;

      if (destinationOffset) {
        return position + destinationOffset;
      }

      return position;
    }, seed);

export const run1 = (input: string[]): number => {
  const { seeds, map } = parseInput(input);

  const reduceLoc = reduceLocationAcrossMaps(map);
  const locations = seeds.map((seed) => reduceLoc(seed));

  return Math.min(...locations);
};

function* iter(start: number, length: number) {
  let index = start;

  while (index <= start + length) {
    yield index++;
  }

  return;
}

export const run2 = (input: string[]): number => {
  const { seeds: seedPairs, map } = parseInput(input);

  const pairs = R.splitEvery(2, seedPairs) as [start: number, length: number][];

  const reduceLoc = reduceLocationAcrossMaps(map);

  let minLocation = Infinity;

  // TODO: range logic instead of brute force
  for (const [start, length] of pairs) {
    for (const seed of iter(start, length)) {
      const location = reduceLoc(seed);
      if (location < minLocation) {
        minLocation = location;
      }
    }
  }

  return minLocation;
};
