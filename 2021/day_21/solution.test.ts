import { it } from "bun:test";

it("should assert", async () => {
  await import("./part1");
  await import("./part2");
});
