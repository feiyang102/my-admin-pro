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
    authority: [1, 3, 4, 6, 7, 8, 9, 11, 12, 13],
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
      const { roleId, roleName } = body;
      instance.update("roleId", roleId, { roleName });
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
  {
    url: "/mock/api/roleAuthUpdate",
    method: "post",
    response: ({ body }) => {
      // TODO 修改角色权限接口
      console.log(body);
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

// [
//   { id: 1, nickName: "许九", roles: [1, 3, 5, 7, 10] },
//   { id: 2, nickName: "刘八", roles: [1, 2, 3, 6, 9] },
//   { id: 3, nickName: "赵六", roles: [1, 3, 4, 8, 9] },
//   { id: 4, nickName: "王五", roles: [2, 3, 7, 8, 10] },
//   { id: 5, nickName: "许九", roles: [1, 2, 4, 6, 8] },
//   { id: 6, nickName: "赵六", roles: [2, 3, 6, 7, 9] },
//   { id: 7, nickName: "张三", roles: [1, 3, 4, 6, 9] },
//   { id: 8, nickName: "赵六", roles: [2, 3, 6, 7, 8] },
//   { id: 9, nickName: "陈七", roles: [1, 2, 3, 8, 9] },
//   { id: 10, nickName: "朱十", roles: [4, 6, 7, 8, 10] },
//   { id: 11, nickName: "刘八", roles: [1, 3, 4, 5, 8] },
//   { id: 12, nickName: "朱十", roles: [2, 3, 7, 8, 10] },
//   { id: 13, nickName: "陈七", roles: [2, 3, 4, 6, 9] },
//   { id: 14, nickName: "李四", roles: [3, 5, 7, 8, 10] },
//   { id: 15, nickName: "张三", roles: [1, 2, 5, 7, 9] },
//   { id: 16, nickName: "朱十", roles: [1, 4, 5, 8, 10] },
//   { id: 17, nickName: "林十二", roles: [1, 3, 6, 8, 10] },
//   { id: 18, nickName: "张三", roles: [2, 3, 6, 8, 9] },
//   { id: 19, nickName: "李四", roles: [1, 3, 6, 8, 10] },
//   { id: 20, nickName: "王五", roles: [1, 2, 6, 7, 8, 10] },
//   { id: 21, nickName: "小刘", roles: [1, 3, 6, 8, 10] },
//   { id: 22, nickName: "王五", roles: [1, 2, 6, 7, 8] },
// ]
