// Game x: x blue, x red; x red, x green, x blue; x green

type Color = "red" | "green" | "blue";

const possible = {
  red: 12,
  green: 13,
  blue: 14,
} as const satisfies Record<Color, number>;

export const run1 = (input: string[]): number => {
  return input.reduce((sum, line) => {
    const { gameStr, sets } = line.match(/^Game (?<gameStr>\d+): (?<sets>.*)$/)!
      .groups!;
    const game = parseInt(gameStr, 10);

    for (const set of sets.split("; ")) {
      for (const colorPair of set.split(", ")) {
        const [count, color] = colorPair.split(" ");

        if (possible[color as Color] < parseInt(count, 10)) {
          return sum;
        }
      }
    }

    return sum + game;
  }, 0);
};

export const run2 = (input: string[]): number => {
  return input.reduce((sum, line) => {
    const { sets } = line.match(/^Game (?<gameStr>\d+): (?<sets>.*)$/)!.groups!;

    const min = { red: 0, green: 0, blue: 0 } satisfies Record<Color, number>;

    for (const set of sets.split("; ")) {
      for (const colorPair of set.split(", ")) {
        const [count, color] = colorPair.split(" ");

        if (min[color as Color] < parseInt(count, 10)) {
          min[color as Color] = parseInt(count, 10);
        }
      }
    }

    const power = min.red * min.green * min.blue;
    return sum + power;
  }, 0);
};
