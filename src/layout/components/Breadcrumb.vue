<template>
  <el-breadcrumb class="layout-breadcrumb" :separator-icon="ArrowRight">
    <el-breadcrumb-item>
      <router-link to="/">首页</router-link>
    </el-breadcrumb-item>
    <el-breadcrumb-item
      v-for="(item, index) in breadCrumbList"
      :key="item.path"
    >
      <router-link :to="item.path" v-if="index === 0">{{
        item.meta.title
      }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ArrowRight } from "@element-plus/icons-vue";
const route = useRoute();
const breadCrumbList = computed(() => {
  return route.matched.filter((item) => item.meta && item.meta.title);
});
</script>

<style lang="less" scoped>
.layout-breadcrumb {
  margin-bottom: 20px;
}
</style>
