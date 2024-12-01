import * as R from "ramda";

const parseInput = (input: string[], calcType: (cards: Card[]) => Type) =>
	input.map((line) => {
		const [cardStr, bidStr] = line.split(" ");

		const cards = cardStr.split("") as Card[];

		return {
			cards,
			bid: Number.parseInt(bidStr, 10),
			type: calcType(cards),
		};
	});

export enum Type {
	FIVE_OF_A_KIND = 0,
	FOUR_OF_A_KIND = 1,
	FULL_HOUSE = 2,
	THREE_OF_A_KIND = 3,
	TWO_PAIR = 4,
	ONE_PAIR = 5,
	HIGH_CARD = 6,
}

// prettier-ignore
export type Card =
	| "A"
	| "K"
	| "Q"
	| "J"
	| "T"
	| "9"
	| "8"
	| "7"
	| "6"
	| "5"
	| "4"
	| "3"
	| "2";

const rankEqualTypeHand = (
	a: Card[],
	b: Card[],
	rank: Record<Card, number>,
): number => {
	const aRanks = a.map((c) => rank[c]);
	const bRanks = b.map((c) => rank[c]);

	for (const [aRank, bRank] of R.zip(aRanks, bRanks)) {
		if (aRank !== bRank) {
			return bRank - aRank;
		}
	}

	return 0;
};

const calcType1 = (cards: Card[]): Type => {
	if (cards.length !== 5) {
		throw new Error(`Invalid hand: ${cards.join("")}`);
	}

	const uniq = R.uniq(cards);

	if (uniq.length === 1) {
		// XXXXX
		return Type.FIVE_OF_A_KIND;
	}

	if (uniq.length === 2) {
		const [firstCount, secondCount] = uniq
			.map((u) => cards.filter((c) => c === u).length)
			.sort((a, b) => a - b);

		if (firstCount === 1 && secondCount === 4) {
			// XXXXY
			return Type.FOUR_OF_A_KIND;
		}

		if (firstCount === 2 && secondCount === 3) {
			// XXXYY, XXYYY
			return Type.FULL_HOUSE;
		}
	}

	if (uniq.length === 3) {
		const [firstCount, secondCount, thirdCount] = uniq
			.map((u) => cards.filter((c) => c === u).length)
			.sort((a, b) => a - b);

		if (firstCount === 1 && secondCount === 1 && thirdCount === 3) {
			// XXXYZ, XYYYZ, XYZZZ
			return Type.THREE_OF_A_KIND;
		}

		if (firstCount === 1 && secondCount === 2 && thirdCount === 2) {
			// XXYYZ, XYYZZ, XXYZZ
			return Type.TWO_PAIR;
		}
	}

	if (uniq.length === 4) {
		// XXYZA, XYYZA, XYZZA, XYZAA
		return Type.ONE_PAIR;
	}

	if (uniq.length === 5) {
		// XYZAB
		return Type.HIGH_CARD;
	}

	throw new Error("Invalid hand");
};

export const calcType2 = (cards: Card[]) => {
	if (cards.length !== 5) {
		throw new Error(`Invalid hand: ${cards.join("")}`);
	}

	const uniq = R.uniq(cards);

	if (uniq.length === 1) {
		// AAAAA
		return Type.FIVE_OF_A_KIND;
	}

	if (uniq.length === 2) {
		if (uniq.includes("J")) {
			// XXXXJ -> XXXXX
			// XXXJJ -> XXXXX
			// XXJJJ -> XXXXX
			// XJJJJ -> XXXXX
			return Type.FIVE_OF_A_KIND;
		}

		const [firstCount, secondCount] = uniq
			.map((u) => cards.filter((c) => c === u).length)
			.sort((a, b) => a - b);

		if (firstCount === 1 && secondCount === 4) {
			// XXXXY
			return Type.FOUR_OF_A_KIND;
		}

		if (firstCount === 2 && secondCount === 3) {
			// XXXYY, XXYYY
			return Type.FULL_HOUSE;
		}
	}

	if (uniq.length === 3) {
		const [firstCount, secondCount, thirdCount] = uniq
			.map((u) => cards.filter((c) => c === u).length)
			.sort((a, b) => a - b);

		const jCount = cards.filter((c) => c === "J").length;
		if (jCount === 1) {
			if (thirdCount === 3) {
				// XXXYJ, XYYYJ
				// can become
				// XXXYX, XYYYY
				return Type.FOUR_OF_A_KIND;
			}

			if (thirdCount === 2) {
				// XXYYJ
				// can become
				// XXYYX
				return Type.FULL_HOUSE;
			}
		} else if (jCount === 2) {
			// XXYJJ, XYYJJ, XXYJJ
			// can become
			// XXYXX, XYYYY, XXYXX
			return Type.FOUR_OF_A_KIND;
		}

		if (firstCount === 1 && secondCount === 1 && thirdCount === 3) {
			// XXXYZ, XYYYZ, XYZZZ
			return Type.THREE_OF_A_KIND;
		}

		if (firstCount === 1 && secondCount === 2 && thirdCount === 2) {
			// XXYYZ, XYYZZ, XXYZZ
			return Type.TWO_PAIR;
		}
	}

	if (uniq.length === 4) {
		if (uniq.includes("J")) {
			// XXYZJ, XYYZJ, XYZZJ, XYZJJ
			// can become
			// XXYZX, XYYZY, XYZZZ, XYZZZ
			return Type.THREE_OF_A_KIND;
		}

		// XXYZA, XYYZA, XYZZA, XYZAA
		return Type.ONE_PAIR;
	}

	if (uniq.length === 5) {
		if (uniq.includes("J")) {
			// XYZAJ
			// can become
			// XYZAX
			return Type.ONE_PAIR;
		}

		// XYZAB
		return Type.HIGH_CARD;
	}

	throw new Error("Invalid hand");
};

const createScorer =
	(rank: Record<Card, number>, calcType: (cards: Card[]) => Type) =>
	(input: string[]): number => {
		return parseInput(input, calcType)
			.sort((a, b) => {
				if (a.type !== b.type) {
					return b.type - a.type;
				}

				return rankEqualTypeHand(a.cards, b.cards, rank);
			})
			.reduce((acc, { bid }, i) => {
				return acc + bid * (i + 1);
			}, 0);
	};

export const run1 = createScorer(
	Object.fromEntries(
		["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"].map(
			(c, i) => [c, i],
		),
	) as Record<Card, number>,
	calcType1,
);

export const run2 = createScorer(
	Object.fromEntries(
		["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"].map(
			(c, i) => [c, i],
		),
	) as Record<Card, number>,
	calcType2,
);
