import { it } from "vitest";

// TODO: does not work
it.skip("should assert", async () => {
	await import("./solution");
});
