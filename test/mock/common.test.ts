import { test, describe, expect } from "vitest";
import { useMock } from "mock/common";
const TEST_LIST = [
  {
    id: 1,
    name: "test1",
  },
  {
    id: 2,
    name: "test2",
  },
  {
    id: 3,
    name: "test3",
  },
  {
    id: 4,
    name: "test4",
  },
];
const ITEM5 = { id: 5, name: "test5" };

describe("mock/common", () => {
  describe("useMock", () => {
    const instance = useMock("test").getTableInstance("test", TEST_LIST);

    test("getTableInstance findOne 测试通过", () => {
      const item = instance.findOne("id", 4);
      expect(item).toEqual({ id: 4, name: "test4" });
    });
    test("getTableInstance findList 测试通过", () => {
      const list: any = instance.findList();
      expect(list).toBe(TEST_LIST);
    });
    test("getTableInstance getNewId 测试通过", () => {
      const id: number = instance.getNewId("id");
      expect(id).toEqual(5);
    });
    test("getTableInstance add 测试通过", () => {
      instance.add(ITEM5);
      const list: any = instance.findList();
      expect(list[4]).toEqual(ITEM5);
    });
    test("getTableInstance update 测试通过", () => {
      instance.update("id", 5, { name: "test-5" });
      const list: any = instance.findList();
      expect(list[4]).toEqual({ id: 5, name: "test-5" });
    });
    test("getTableInstance remove 测试通过", () => {
      const list: any = instance.remove("id", 5);
      expect(list[4]).toEqual(undefined);
    });
  });
});
