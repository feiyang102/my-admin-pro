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
    username: "",
    accessToken: "",
    roles: ["common"],
  }),
  getters: {},
  actions: {
    storeUserLogin(data: ILoginRequest) {
      return userLogin(data).then((res) => {
        const data = res.data;
        this.username = data.username;
        this.roles = data.roles;
        this.accessToken = data.accessToken;
        return data;
      });
    },
    storeRefreshUserInfo() {
      if (this.username == "飞扬" && this.accessToken != "") {
        refreshUserInfo({ accessToken: this.accessToken })
          .then((res) => {
            const data = res.data;
            this.username = data.username;
            this.roles = data.roles;
            this.accessToken = data.accessToken;
            return data;
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
