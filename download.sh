#!/usr/bin/env bash

set -euo pipefail

if [ ! -f "${HOME}/.adventofcode.session" ]; then
	# shellcheck disable=SC2269
	ADVENT_OF_CODE_SESSION="${ADVENT_OF_CODE_SESSION}"
fi

export DAY="$1"
export YEAR="${2:-2024}"

export PUZZLE_DIR="./${YEAR}/day_${DAY}"
mkdir -p "${PUZZLE_DIR}"

aoc download --day "${DAY}" --year "${YEAR}" --overwrite --input-file "${PUZZLE_DIR}/input.txt" --puzzle "${PUZZLE_DIR}/puzzle.md"

echo "${PUZZLE_DIR}"
