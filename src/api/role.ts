import { get } from "@/http/request";

export const roleList = async (params?: any) => {
  return get("/getRoleList", params);
};
