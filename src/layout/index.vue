<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="layout_menu"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>父菜单</template>
            <el-menu-item index="1-1">子菜单1</el-menu-item>
            <el-menu-item index="1-2">子菜单2</el-menu-item>
            <el-menu-item index="1-3">子菜单3</el-menu-item>
          </el-sub-menu>

          <el-menu-item index="1">
            <!-- <el-icon><icon-menu /></el-icon> -->
            <span>项目模块</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span>用户模块</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span>角色模块</span>
          </el-menu-item>
          <el-menu-item index="4">
            <span>权限模块</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Header from "./components/Header.vue";

const handleOpen = function () {};
const handleClose = function () {};
</script>

<style scoped lang="less">
.el-header {
  padding: 0;
  margin-bottom: 5px;
}
.layout_menu {
  height: calc(100vh - 65px);
}
</style>
