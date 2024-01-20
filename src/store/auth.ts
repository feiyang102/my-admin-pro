import { authTree } from "@/api/auth";

export const useAuthStore = defineStore("auth", () => {
  const authList = ref<any>([]);
  async function getAuthTree() {
    if (authList.value.length == 0) {
      // 获取权限列表的逻辑
      const res = await authTree();
      authList.value = res.data;
      return res.data;
    } else {
      return authList.value;
    }
  }

  return {
    authList,
    getAuthTree,
  };
});
