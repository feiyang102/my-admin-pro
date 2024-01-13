import { get } from "@/http/request";
import { IProjectQuery, IProjectRes } from "#/project";
// import { IPager } from "#/pager";

// export interface IPager {
//     pageNumber: number,
//     pageSize: number
// };

// export interface IProjectQuery extends IPager {
//   title: string;
//   introduce: string;
// }

// export interface IProjectItem {
//   id: number;
//   title: string;
//   introduce: string;
// }
// export interface IProjectRes {
//   list: IProjectItem[];
//   total: number;
// }

// // 刷新登录信息需要的参数
// export type reLoginRequest = {
//   accessToken: string;
// };

// export type LoginResponse = {
//   username: string;
//   roles: string[];
//   accessToken: string;
// };

// 定义的接口
export const projectList = async (data: IProjectQuery) => {
  // return post<LoginResponse, any>({}, "/login", data);
  return get<IProjectRes>("/projects", data);
};
