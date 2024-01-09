<template>
  <div class="login-box">
    <div class="login-form">
      <h1 class="form_title">企业中后台管理系统</h1>
      <el-form ref="formRef" :model="formData" :rules="formRules">
        <el-form-item prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="form_button" @click="userLogin(formRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { FormInstance } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const formRef = ref<FormInstance>();

const formData = reactive({
  username: "admin",
  password: "admin",
});

const formRules = reactive({
  username: [
    {
      require: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      require: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
});

async function userLogin(formEl: FormInstance | undefined) {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      userStore
        .storeUserLogin(formData)
        .then(() => {
          router.push("/");
        })
        .catch((err) => {
          console.log("登录失败：", err);
        });
    } else {
      console.log("表单校验失败：", fields);
    }
  });
}
</script>

<style scoped lang="less">
.login-box {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    .form_title {
      text-align: center;
    }
    .form_button {
      width: 100%;
      background-color: #5129f2;
      color: #fff;
    }
  }
}
</style>
