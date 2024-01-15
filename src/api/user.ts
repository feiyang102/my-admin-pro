import { get, post } from "@/http/request";
import {
  LoginRequest,
  LoginResponse,
  reLoginRequest,
  IUserListItem,
} from "#/user";

// 定义的接口
export const userLogin = async (data?: LoginRequest) => {
  // return post<LoginResponse, any>({}, "/login", data);
  return post<LoginResponse>("/login", data);
};

export const refreshUserInfo = async (data?: reLoginRequest) => {
  // return post<LoginResponse, any>({}, "/getUserInfo", data);
  return post<LoginResponse>("/getUserInfo", data);
};

export const userList = async (params?: any) => {
  return get("/getUserList", params);
};

export const userEdit = async (data: IUserListItem) => {
  return post("/userEdit", data);
};
