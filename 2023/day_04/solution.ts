const parseInput = (line: string) => {
  const [_cardStr, values] = line.split(/:\s+/);
  const [winningValuesStr, cardValuesStr] = values.split(/\s\|\s+/);

  const winningValues = new Set(
    winningValuesStr.split(/\s+/).map((val) => parseInt(val, 10)),
  );

  const cardValues = cardValuesStr.split(/\s+/);

  return { winningValues, cardValues };
};

export const run1 = (input: string[]): number => {
  return input
    .map((line, i) => {
      const { winningValues, cardValues } = parseInput(line);

      return cardValues.reduce((sum, val) => {
        if (winningValues.has(parseInt(val, 10))) {
          return sum ? sum * 2 : 1;
        }
        return sum;
      }, 0);
    })
    .reduce<number>((sum, val) => sum + (val ?? 0), 0);
};

export const run2 = (input: string[]): number => {
  const cardInstances: Record<number, number> = Object.fromEntries(
    Array.from({ length: input.length }, (_, i) => [i + 1, 1]),
  );

  input.forEach((line, i) => {
    const cardNum = i + 1;

    const { winningValues, cardValues } = parseInput(line);

    cardValues.reduce((cardsWon, val) => {
      if (winningValues.has(parseInt(val, 10))) {
        // we're at card x; each time we match a number,
        // we win one more card of an incrementing number
        const nextCardsWon = cardsWon + 1;
        // but _each_ of these instances wins a card, so
        // add the number of instances of this current card to
        // the won card
        cardInstances[nextCardsWon] += cardInstances[cardNum];
        return nextCardsWon;
      }
      return cardsWon;
    }, cardNum);
  });

  return Object.values(cardInstances).reduce((sum, val) => sum + val, 0);
};
