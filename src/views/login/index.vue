<template>
  <div>login</div>
  <div><el-button @click="console.log(111)">测试</el-button></div>
  <div class="icon_star"><Star /></div>
  <el-icon><Star /></el-icon>
</template>

<script lang="ts" setup>
import { ElButton } from "element-plus";
import { Star } from "@element-plus/icons-vue";
// import { useUserStore } from "@/store/user";
// import { userLogin, LoginRequest } from "@/api/user";

// const userStore = useUserStore();
// console.log(`userStore: ${JSON.stringify(userStore)}`);

// const userInfo: LoginRequest = {
//   username: "admin",
//   password: "admin",
// };
// userLogin(userInfo);
</script>

<style scoped lang="less">
.icon_star {
  width: 20px;
  height: 20px;
  svg {
    color: red;
  }
}
</style>
