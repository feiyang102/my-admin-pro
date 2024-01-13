import { get } from "@/http/request";
import { IProjectQuery, IProjectRes } from "#/project";

// 定义的接口
export const projectList = async (data: IProjectQuery) => {
  // return post<LoginResponse, any>({}, "/login", data);
  return get<IProjectRes>("/projects", data);
};
