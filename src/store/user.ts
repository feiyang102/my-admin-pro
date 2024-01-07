import { defineStore } from "pinia";
import pinia from "@/store";
import { refreshUserInfo, userLogin } from "@/api/user";
// import { IUserState, ILoginRequest } from "./types";

export interface IUserState {
  username: string;
  accessToken: string;
  refreshToken?: string;
  roles: string[]; // 也可以写成 Array<string>
}

// 登录方法的入参格式，我们不定义的话书写的时候没有类型推断
export interface ILoginRequest {
  username: string;
  password: string;
}

// export interface UserState {
//     username: string;
//     accessToken: string;
//     refreshToken: string;
//     roles: Array<string>;
// }

export const useUserStoreHook = defineStore("userInfo", {
  state: (): IUserState => ({
    username: "飞扬",
    accessToken: "",
    roles: ["common"],
  }),
  getters: {},
  actions: {
    storeUserLogin(data: ILoginRequest) {
      return userLogin(data).then((res) => {
        this.username = res.username;
        this.roles = res.roles;
        this.accessToken = res.accessToken;
      });
    },
    storeRefreshUserInfo() {
      if (this.username == "飞扬" && this.accessToken != "") {
        refreshUserInfo({ accessToken: this.accessToken })
          .then((res) => {
            this.username = res.username;
            this.roles = res.roles;
            this.accessToken = res.accessToken;
          })
          .catch(() => {
            this.accessToken = "";
          });
      }
    },
  },
  persist: {
    key: "userInfo",
    storage: sessionStorage,
    paths: ["accessToken"],
  },
});

export function useUserStore() {
  return useUserStoreHook(pinia);
}
