import { IPaginationQuery, IPaginationRes } from "#/common";

// 分页请求的出入参
export interface IProjectItem {
  id: number;
  title: string;
  introduce: string;
}

export interface IProjectData {
  list: IProjectItem[];
  total: number;
}

export interface IProjectQuery extends IPaginationQuery {
  title: string;
  introduce: string;
}

export interface IProjectRes extends IPaginationRes<IProjectData> {}
