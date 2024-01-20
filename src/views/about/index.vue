<template>
  <div class="wrap-about">about</div>
  <el-form ref="formRef"></el-form>
</template>

<script lang="ts" setup>
import { useCompRef } from "@/hooks/useCompRef";
import { ElForm } from "element-plus";

const formRef = useCompRef<typeof ElForm>();
console.log(formRef);
</script>

<style lang="less" scoped>
// @import "@/styles/variable.less";
.wrap-about {
  color: @color;
  background: @bg;
}
</style>
