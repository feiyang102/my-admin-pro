<template>
  <div>
    <div>{{ props.name }}</div>
    <el-tree
      ref="tree"
      :data="data"
      show-checkbox
      node-key="roleId"
      :default-expanded-keys="props.roles"
      :default-checked-keys="props.roles"
      :props="defaultProps"
    ></el-tree>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, defineExpose } from "vue";
import { authTree } from "@/api/auth";
const props = defineProps(["roles", "name"]);
const tree = ref<any>(null);
console.log(props.roles);

const defaultProps = {
  children: "roleList",
  label: "name",
};

const data = ref([]);

const getCheckedKeys = () => {
  console.log(111);
  return tree.value?.getCheckedKeys();
};

onMounted(async () => {
  const res: any = await authTree().catch((err) => {
    console.log(err);
  });
  data.value = res.data;
});

defineExpose({
  getCheckedKeys,
});
</script>

<style scoped></style>
