import assert from "assert";
import * as R from "ramda";
import { time } from "../../getInputLines";

import { getNextParams, startingUniverse, Universe } from "./common";

const dieRolls = [1, 2, 3];

const permutate3 = R.lift((a, b, c) => a + b + c);

const dieRollsOnEachTurn: [rolledValue: string, count: number][] =
  Object.entries(
    R.countBy(R.identity, permutate3(dieRolls, dieRolls, dieRolls))
  );

const expandUniverse = ({
  player,
  positions,
  scores,
}: Universe): (
  | { type: "next"; count: number; universe: Universe }
  | { type: "win"; count: number; player: 1 | 2 }
)[] =>
  dieRollsOnEachTurn.map(([nextRoll, count]) => {
    const nextParams = getNextParams(
      { player, positions },
      parseInt(nextRoll, 10)
    );

    const newScore = scores[player] + nextParams.positions[player];

    if (newScore >= 21) {
      return { type: "win", count, player };
    }

    return {
      type: "next",
      count,
      universe: {
        player: nextParams.player,
        positions: nextParams.positions,
        scores: {
          ...scores,
          [player]: newScore,
        },
      },
    };
  });

const winCount = { 1: 0, 2: 0 };

const serializeUni = ({ positions, scores, player }: Universe) =>
  JSON.stringify({ positions, scores, player });

const parseUni = (str: string) => JSON.parse(str) as Universe;

const tick = (
  activeCounts: Record<string, number> = {
    [serializeUni(startingUniverse)]: 1,
  }
) => {
  const newActiveCounts: Record<string, number> = {};
  let hasNext = false;

  Object.entries(activeCounts).forEach(([key, universeCount]) => {
    const universe = parseUni(key);

    expandUniverse(universe).forEach((result) => {
      const increment = (obj: Record<string, number>, key: string | number) => {
        // This roll happens result.count times on universeCount universes
        obj[key] = (obj[key] ?? 0) + universeCount * result.count;
      };

      if (result.type === "next") {
        hasNext = true;
        increment(newActiveCounts, serializeUni(result.universe));
      } else {
        increment(winCount, universe.player);
      }
    });
  });

  if (hasNext) {
    tick(newActiveCounts);
  }
};

time("runtime", () => {
  tick();
});

const winningScore = R.max(winCount[1], winCount[2]);

assert.strictEqual(winningScore, 433315766324816);

console.log({ winningScore, winCount });
