import { get } from "@/http/request";

export const authTree = async () => {
  return get("/getAuthList", {});
};
