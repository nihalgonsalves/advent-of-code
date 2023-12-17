import type { Cell, Input, Output, Cursor } from "./worker";

const workerURL = new URL("worker.ts", import.meta.url).href;

const parseInput = (input: string[]): Cell[][] =>
  input.map((line, i) =>
    line.split("").map((char, j) => ({
      i,
      j,
      value: char,
      energizedCount: 0,
    })),
  );

const asyncTraverse = async (input: Input): Promise<Output> => {
  const { promise, resolve } = Promise.withResolvers<Output>();

  const worker = new Worker(workerURL);
  worker.onmessage = (event) => {
    resolve(event.data);
  };
  worker.postMessage(input);

  return promise;
};

export const run1 = async (input: string[]): Promise<number> => {
  const outputMatrix = await asyncTraverse({
    matrix: parseInput(input),
    startingCursor: { i: 0, j: -1, direction: "east" },
  });

  return outputMatrix
    .flat()
    .reduce((acc, cell) => (cell.energizedCount > 0 ? acc + 1 : acc), 0);
};

export const run2 = async (input: string[]): Promise<number> => {
  const inputMatrix = parseInput(input);

  const cursors: Cursor[] = [
    // top
    ...Array.from({ length: inputMatrix[0].length }, (_, j) => ({
      i: -1,
      j,
      direction: "south" as const,
    })),
    // bottom
    ...Array.from({ length: inputMatrix[0].length }, (_, j) => ({
      i: inputMatrix.length,
      j,
      direction: "north" as const,
    })),
    // left
    ...Array.from({ length: inputMatrix.length }, (_, i) => ({
      i,
      j: -1,
      direction: "east" as const,
    })),
    // right
    ...Array.from({ length: inputMatrix.length }, (_, i) => ({
      i,
      j: inputMatrix[0].length,
      direction: "west" as const,
    })),
  ];

  const results = await Promise.all(
    cursors.map(async (startingCursor) => {
      const outputMatrix = await asyncTraverse({
        matrix: inputMatrix,
        startingCursor,
      });

      return outputMatrix
        .flat()
        .reduce((acc, cell) => (cell.energizedCount > 0 ? acc + 1 : acc), 0);
    }),
  );

  return Math.max(...results);
};
