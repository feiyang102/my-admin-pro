// 分页入参
export interface IPaginationQuery {
  pageNumber: number;
  pageSize: number;
}

// 分页出参
export interface IPaginationRes<T> {
  data: T;
  total: number;
}
