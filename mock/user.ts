import { IUserQuery } from "#/user";
import { pagerUtil } from "@/utils";
import { MockMethod } from "vite-plugin-mock";
import { useMock } from "./common";

const userMock = useMock("user");
const STATIC_USER_LIST = [
  {
    id: 1,
    nickName: "许九",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
  {
    id: 2,
    nickName: "刘八",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
  {
    id: 3,
    nickName: "赵六",
    roles: [
      { roleId: 1, roleName: "管理员" },
      { roleId: 2, roleName: "普通用户" },
    ],
  },
  {
    id: 4,
    nickName: "王五",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
  {
    id: 5,
    nickName: "许九",
    roles: [
      { roleId: 1, roleName: "管理员" },
      { roleId: 2, roleName: "普通用户" },
    ],
  },
  {
    id: 6,
    nickName: "赵六",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
  {
    id: 7,
    nickName: "张三",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
  {
    id: 8,
    nickName: "赵六",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
  {
    id: 9,
    nickName: "陈七",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
  {
    id: 10,
    nickName: "朱十",
    roles: [
      { roleId: 1, roleName: "管理员" },
      { roleId: 2, roleName: "普通用户" },
    ],
  },
  {
    id: 11,
    nickName: "刘八",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
  {
    id: 12,
    nickName: "朱十",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
  {
    id: 13,
    nickName: "陈七",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
  {
    id: 14,
    nickName: "李四",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
  {
    id: 15,
    nickName: "张三",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
  {
    id: 16,
    nickName: "朱十",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
  {
    id: 17,
    nickName: "林十二",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
  {
    id: 18,
    nickName: "张三",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
  {
    id: 19,
    nickName: "李四",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
  {
    id: 20,
    nickName: "王五",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
  {
    id: 21,
    nickName: "小刘",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
  {
    id: 22,
    nickName: "王五",
    roles: [{ roleId: 2, roleName: "普通用户" }],
  },
];
userMock?.set("userList", STATIC_USER_LIST);

// const getRandomRoles = (
//   length: number,
//   min: number,
//   max: number,
// ): Array<number> => {
//   const randomArray = new Array<number>();
//   for (let i = 0; i < length; i++) {
//     const randomNumber = Math.floor(Math.random() * (max - min) + min);
//     randomArray.push(randomNumber);
//   }

//   return Array.from(new Set(randomArray));
// };

export default [
  {
    // 前面的 /mock 为 mock 生效需要配置的根路径 后面会提到
    url: "/mock/api/login",
    method: "post",
    // 使用 body 可以获取请求体
    response: ({ body }) => {
      // 简单编写一个逻辑
      // 用户名不等于密码就是密码错误
      if (body.username !== body.password) {
        // 返回JSON信息
        return {
          code: 1,
          message: "密码错误",
          data: {
            username: "",
            roles: [],
            accessToken: "",
          },
        };
      }
      // 其余的则显示登录成功
      if (body.username === "admin") {
        return {
          code: 0,
          message: "登录成功",
          data: {
            username: "admin",
            roles: ["admin"],
            accessToken: "admin",
          },
        };
      } else {
        return {
          code: 0,
          message: "登录成功",
          data: {
            username: "common",
            roles: ["common"],
            accessToken: "common",
          },
        };
      }
    },
  },
  {
    url: "/mock/api/getUserList",
    method: "get",
    response: ({ query }) => {
      const {
        pageNumber,
        pageSize,
        nickName = "",
        roleId = "0",
      } = query as IUserQuery;
      // 筛选功能
      let list = STATIC_USER_LIST;
      if (nickName) {
        list = list.filter((item) => item.nickName.indexOf(nickName) >= 0);
      }
      if (roleId && roleId != "0") {
        const role = Number(roleId);

        list = list.filter((item) => {
          for (let i = 0; i < item.roles.length; i++) {
            if (item.roles[i]["roleId"] === role) {
              return true;
            }
          }
        });
      }

      // 分页功能
      const total = list.length;
      // 分页
      const { beginIndex, endIndex } = pagerUtil(pageNumber, pageSize);
      list = list.slice(beginIndex, endIndex);
      return {
        code: 0,
        message: "success",
        data: {
          list: list,
          total,
        },
      };
    },
  },
  {
    url: "/mock/api/userCreate",
    method: "post",
    response: ({ body }) => {
      const { id, nickName, roles } = body;
      console.log("id", id);
      let maxItem = STATIC_USER_LIST[0];
      STATIC_USER_LIST.forEach((item) => {
        if (maxItem.id < item.id) {
          maxItem = item;
        }
      });
      const user = {
        id: maxItem.id + 1,
        nickName: nickName,
        roles: roles,
      };
      STATIC_USER_LIST.push(user);
      return {
        code: 0,
        message: "success",
        data: {},
      };
    },
  },
  {
    url: "/mock/api/userEdit",
    method: "post",
    response: ({ body }) => {
      const { id, nickName, roles } = body;
      STATIC_USER_LIST.forEach((item) => {
        if (item.id === id) {
          item.nickName = nickName;
          item.roles = roles;
        }
      });

      return {
        code: 0,
        message: "success",
        data: {},
      };
    },
  },
] as MockMethod[];
