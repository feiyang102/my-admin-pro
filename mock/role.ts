import { MockMethod } from "vite-plugin-mock";
import { useMock } from "./common";

const ROLE_LIST = [
  {
    roleName: "管理员",
    roleId: 1,
    authority: [1, 2, 4, 5, 6, 7, 8, 9, 11, 13, 14, 15, 16],
  },
  {
    roleName: "普通用户",
    roleId: 2,
    authority: [1, 10],
  },
];
const instance = useMock("role").getTableInstance("roleList", ROLE_LIST);

export default [
  {
    url: "/mock/api/getRoleList",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "success",
        data: instance.findList(),
      };
    },
  },
  {
    url: "/mock/api/roleAdd",
    method: "post",
    response: ({ body }) => {
      const { roleName } = body;
      const roleId = instance.getNewId("roleId");
      const query = { roleId, roleName };
      instance.add(query);
      return {
        code: 0,
        message: "success",
        data: {
          result: true,
          message: "新增成功",
        },
      };
    },
  },
  {
    url: "/mock/api/roleUpdate",
    method: "post",
    response: ({ body }) => {
      const { roleId, roleName, authority } = body;
      const query: any = {};
      if (roleName) query.roleName = roleName;
      if (authority) query.authority = authority;
      instance.update("roleId", roleId, query);
      return {
        code: 0,
        message: "success",
        data: {
          result: true,
          message: "更新成功",
        },
      };
    },
  },
  {
    url: "/mock/api/roleRemove",
    method: "post",
    response: ({ body }) => {
      const { roleId } = body;
      instance.remove("roleId", roleId);
      return {
        code: 0,
        message: "success",
        data: {
          result: true,
          message: "更新成功",
        },
      };
    },
  },
] as MockMethod[];
