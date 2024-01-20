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
import { useAuthStore } from "@/store/auth";
const authStore = useAuthStore();

const props = defineProps(["roles", "name"]);
const tree = ref<any>(null);

const defaultProps = {
  children: "roleList",
  label: "name",
};

const data = ref([]);

const getCheckedKeys = () => {
  return tree.value?.getCheckedKeys();
};

onMounted(async () => {
  const res: any = await authStore.getAuthTree().catch((err) => {
    console.log(err);
  });
  data.value = res;
});

defineExpose({
  getCheckedKeys,
});
</script>

<style scoped></style>
