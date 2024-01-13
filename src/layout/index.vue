<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="activePath" class="layout_menu" router>
          <el-menu-item
            v-for="item in menuList"
            :index="item.path"
            :key="item.path"
            >{{ item.meta.title }}</el-menu-item
          >
          <!-- <el-sub-menu index="1">
            <template #title>父菜单</template>
            <el-menu-item index="1-1">子菜单1</el-menu-item>
            <el-menu-item index="1-2">子菜单2</el-menu-item>
            <el-menu-item index="1-3">子菜单3</el-menu-item>
          </el-sub-menu> -->
        </el-menu>
      </el-aside>
      <el-main class="layout_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import Header from "./components/Header.vue";

const router = useRouter();
const route = useRoute();

const menuList = router.getRoutes().filter((item) => {
  return item.meta.isShow;
});
const activePath = route.path;
</script>

<style scoped lang="less">
.el-header {
  padding: 0;
  margin-bottom: 5px;
}
.layout_menu,
.layout_main {
  height: calc(100vh - 65px);
}
</style>
