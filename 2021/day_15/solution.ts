import assert from "assert";
import R from "ramda";

import { getInputLines } from "../getInputLines";

type Position = { x: number; y: number };
type Node = Position & { risk: number };
type ScoredNode = Node & {
  f: number;
  g: number;
  h: number;
  parent?: ScoredNode;
};

const matrix: Node[][] = getInputLines("15").map((line, x) =>
  line.split("").map((risk, y) => ({
    x,
    y,
    risk: parseInt(risk, 10),
  }))
);

const isNode = (a: Position, b: Position) => a.x === b.x && a.y === b.y;

// A* with g = parent.g + risk, h = Δx + Δy
const findPaths = (source: Node, destination: Node): ScoredNode => {
  const visited = Array.from({ length: matrix.length }, () =>
    Array.from({ length: matrix[0].length }, () => false)
  );

  const getNeighbours = ({ x, y }: Node): Node[] =>
    [
      matrix[x - 1]?.[y],
      matrix[x + 1]?.[y],
      matrix[x]?.[y - 1],
      matrix[x]?.[y + 1],
    ].filter((v) => v !== undefined && !visited[v.x][v.y]);

  const calcH = ({ x, y }: Position) =>
    Math.abs(x - destination.x) + Math.abs(y - destination.y);

  let openNodes: ScoredNode[] = [{ ...source, f: 0, g: 0, h: calcH(source) }];

  while (openNodes.length !== 0) {
    const [currentNode, ...nextOpenNodes] = R.sortBy(R.prop("f"), openNodes);

    openNodes = nextOpenNodes;
    visited[currentNode.x][currentNode.y] = true;

    if (isNode(currentNode, destination)) {
      return currentNode;
    }

    getNeighbours(currentNode).forEach(({ risk, ...node }) => {
      const g = currentNode.g + risk;
      const h = calcH(node);

      const scoredNode = { ...node, risk, g, h, f: g + h, parent: currentNode };

      const existingOpenNode = openNodes.find((openNode) =>
        isNode(openNode, node)
      );

      if (!existingOpenNode || scoredNode.g < existingOpenNode.g) {
        openNodes.push(scoredNode);
      }
    });
  }

  throw new Error("No path found");
};

// Part 1

const part1SolutionNode = findPaths(
  matrix.at(0)!.at(0)!,
  matrix.at(-1)!.at(-1)!
);

// Part 2

// Solution

assert.strictEqual(part1SolutionNode.f, 609);

console.log({ part1: part1SolutionNode.f });
