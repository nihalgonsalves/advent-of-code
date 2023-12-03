import { it } from "bun:test";

// TODO: does not work
it.skip("should assert", async () => {
  await import("./solution");
});
