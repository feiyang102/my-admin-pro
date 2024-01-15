import { test, expect, describe } from "vitest";
import { add } from "@/utils";

describe("@/utils", () => {
  test("adds 1 + 1 to equal 2", () => {
    expect(1 + 1).toBe(2);
  });

  test("add function test 1 + 1 to equal 2", () => {
    expect(add(1, 1)).toBe(2);
  });
});
