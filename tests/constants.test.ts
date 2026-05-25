import { describe, expect, it } from "bun:test";

import { DEFAULT_ANSWER_TIMEOUT_MS, DEFAULT_REVIEW_TIMEOUT_MS } from "../src/config/schema";

describe("constants", () => {
  it("should export DEFAULT_ANSWER_TIMEOUT_MS as 5 minutes", () => {
    expect(DEFAULT_ANSWER_TIMEOUT_MS).toBe(300000);
  });

  it("should export DEFAULT_REVIEW_TIMEOUT_MS as 10 minutes", () => {
    expect(DEFAULT_REVIEW_TIMEOUT_MS).toBe(600000);
  });
});
