import { IPaginationQuery } from "#/common";

export type LoginRequest = {
  username: string;
  password: string;
};

// 刷新登录信息需要的参数
export type reLoginRequest = {
  accessToken: string;
};

export type LoginResponse = {
  username: string;
  roles: string[];
  accessToken: string;
};

// 获取用户列表相关接口
interface IUserItem {
  role: number; // 角色id
  roleName: string; // 角色名称
}

export interface IUserListItem {
  id?: number;
  nickName: string;
  roles: IUserItem[];
}

export interface IUserQuery extends IPaginationQuery {
  nickName: string;
  roleId: number | string;
}
