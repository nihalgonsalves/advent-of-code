#!/usr/bin/env bash

set -euo pipefail

export DAY="$1"
export YEAR="${2:-2024}"

export PUZZLE_DIR="./${YEAR}/day_${DAY}"
mkdir -p "${PUZZLE_DIR}"

cp -n ./solution.ts.sample "${PUZZLE_DIR}/solution.ts"
cp -n ./solution.test.ts.sample "${PUZZLE_DIR}/solution.test.ts"

echo "${PUZZLE_DIR}"

touch "${PUZZLE_DIR}/input.txt"
set -x
bun test "${YEAR}/day_${DAY}"