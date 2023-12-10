const parseInput = (input: string[]) => {
  const [directionsStr, ...edges] = input;

  const directions = directionsStr
    .split("")
    .map((direction) => (direction === "L" ? 0 : 1));

  function* cycleDirections() {
    let directionCursor = 0;

    while (true) {
      yield directions[directionCursor];

      directionCursor =
        directionCursor === directions.length - 1 ? 0 : directionCursor + 1;
    }
  }

  return {
    cycleDirections,
    edges: Object.fromEntries(
      edges.map((edge) => {
        const [from, left, right] = [...edge.matchAll(/[A-Z0-9]{3}/g)].map(
          ([match]) => match,
        );
        return [from, [left, right] as const] as const;
      }),
    ),
  };
};

const minSteps = (
  directions: Generator<number>,
  cursor: string,
  edges: Record<string, readonly [string, string]>,
  endCondition: (cursor: string) => boolean,
): number => {
  let steps: number;
  for (steps = 0; !endCondition(cursor); steps++) {
    cursor = edges[cursor][directions.next()!.value!];
  }

  return steps;
};

export const run1 = (input: string[]): number => {
  const { cycleDirections, edges } = parseInput(input);

  return minSteps(
    cycleDirections(),
    "AAA",
    edges,
    (cursor) => cursor === "ZZZ",
  );
};

const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));

const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

const lcmList = (numbers: number[]) => {
  const [start, ...rest] = numbers;

  return rest.reduce((acc, n) => lcm(acc, n), start);
};

export const run2 = (input: string[]): number => {
  const { cycleDirections, edges } = parseInput(input);

  return lcmList(
    Object.keys(edges)
      .filter((key) => key.endsWith("A"))
      .map((cursor) =>
        minSteps(cycleDirections(), cursor, edges, (cursor) =>
          cursor.endsWith("Z"),
        ),
      ),
  );
};
