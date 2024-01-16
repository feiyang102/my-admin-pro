import { get, post } from "@/http/request";

export const roleList = async (params?: any) => {
  return get("/getRoleList", params);
};

export const roleAdd = async (data: any) => {
  return post("/roleAdd", data);
};

export const roleUpdate = async (data: any) => {
  return post("/roleUpdate", data);
};

export const roleRemove = async (data: any) => {
  return post("/roleRemove", data);
};

export const roleAuthUpdate = async (data: any) => {
  return post("/roleAuthUpdate", data);
};
