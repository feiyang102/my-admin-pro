<template>
  <div>login</div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/user";
import { userLogin, LoginRequest } from "@/api/user";

const userStore = useUserStore();
console.log(`userStore: ${JSON.stringify(userStore)}`);

const userInfo: LoginRequest = {
  username: "admin",
  password: "admin",
};
userLogin(userInfo);
</script>

<style scoped></style>
