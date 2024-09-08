// src/tests/helpers.test.js
import { describe, it, expect } from "vitest";
import { getWordAfterKeyword } from "../utils/helpers.ts";

describe("getWordAfterKeyword", () => {
  it("should return the word after the given keyword", () => {
    const sentence = "This is a test Spool value for testing";
    const keyword = "Spool";
    const result = getWordAfterKeyword(sentence, keyword);
    expect(result).toBe("value");
  });

  it("should return null if the keyword is not found", () => {
    const sentence = "This is a test string";
    const keyword = "Spool";
    const result = getWordAfterKeyword(sentence, keyword);
    expect(result).toBe(null);
  });
});
