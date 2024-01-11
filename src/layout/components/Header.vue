<template>
  <div class="header">
    <div class="flex-center">Logo区域</div>
    <div class="flex-grow"></div>
    <div class="flex-center m05 header_userinfo">
      <el-icon><User /></el-icon>
      <span>{{ userName }}</span>
    </div>
    <div class="flex-center m05 header_setting" @click="isDrawerShow = true">
      <el-icon><Setting /></el-icon>
    </div>
  </div>
  <el-drawer
    v-model="isDrawerShow"
    title="用户设置"
    :before-close="handleClose"
    confirm-button-text="确定"
    cancel-button-text="取消"
  >
    <div class="header_logout">
      <el-button type="primary" @click="logout"> 退出登录 </el-button>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
// import { ElMessageBox } from "element-plus";
import { User, Setting } from "@element-plus/icons-vue";

let router = useRouter();
let store = useUserStore();
const userName = store.username;
let isDrawerShow = ref(false);

const handleClose = function () {
  isDrawerShow.value = false;
};
// const handleClose = function (done: () => void) {
//   ElMessageBox.confirm("你确定要关闭吗？", "", {
//     distinguishCancelAndClose: true,
//     confirmButtonText: "确定",
//     cancelButtonText: "取消",
//   })
//     .then(() => {
//       done();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const logout = function () {
  sessionStorage.removeItem("userInfo");
  router.push("/login");
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  box-shadow: 0 0 20px rgba(195, 223, 252, 0.4);
  .header_setting {
    cursor: pointer;
    font-size: 20px;
  }
}
.header_logout {
  display: flex;
  justify-content: center;
}
</style>
