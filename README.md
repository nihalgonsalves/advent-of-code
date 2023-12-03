```sh
brew install scarvalhojr/tap/aoc-cli

export ADVENT_OF_CODE_SESSION=""

YEAR=2023
DAY=01
PUZZLE_DIR="./${YEAR}/day_${DAY}"
mkdir -p "${PUZZLE_DIR}"

cp ./solution.ts.sample "${PUZZLE_DIR}/solution.ts"
cp ./solution.test.ts.sample "${PUZZLE_DIR}/solution.test.ts"

# part 1
./aoc download --day "${DAY}" --year "${YEAR}" --input-file "${PUZZLE_DIR}/input.txt" --puzzle "${PUZZLE_DIR}/puzzle.md"
./aoc --day "${DAY}" --year "${YEAR}" submit 1 <answer>

bun test "2023/day_${DAY}"

# part 2
./aoc download --day "${DAY}" --year "${YEAR}" --overwrite --puzzle-only --puzzle "${PUZZLE_DIR}/puzzle.md"
./aoc --day "${DAY}" --year "${YEAR}" submit 2 <answer>

bun test "2023/day_${DAY}"
```
