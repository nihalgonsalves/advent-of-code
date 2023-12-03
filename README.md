```sh
brew install scarvalhojr/tap/aoc-cli

export ADVENT_OF_CODE_SESSION=""

./generate.sh 01 2023

./download.sh 01 2023
./aoc --day "${DAY}" --year "${YEAR}" submit 1 <answer>

./download.sh 01 2023
./aoc --day "${DAY}" --year "${YEAR}" submit 2 <answer>
```
