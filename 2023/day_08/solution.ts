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

  const directionIter = cycleDirections();

  return {
    nextDirection: () => directionIter.next().value!,
    edges: Object.fromEntries(
      edges.map((edge) => {
        const [from, left, right] = [...edge.matchAll(/[A-Z0-9]{3}/g)].map(
          ([match]) => match
        );
        return [from, [left, right] as const] as const;
      })
    ),
  };
};

export const run1 = (input: string[]): number => {
  const { nextDirection, edges } = parseInput(input);

  let cursor = "AAA";

  let steps: number;
  for (steps = 0; cursor !== "ZZZ"; steps++) {
    cursor = edges[cursor][nextDirection()];
  }

  return steps;
};

export const run2 = (input: string[]): number => {
  const { nextDirection, edges } = parseInput(input);

  let cursors = Object.keys(edges).filter((key) => key.endsWith("A"));

  let steps: number;
  for (steps = 0; cursors.some((cursor) => !cursor.endsWith("Z")); steps++) {
    const dir = nextDirection();

    cursors = cursors.map((cursor) => edges[cursor][dir]);
  }

  return steps;
};
