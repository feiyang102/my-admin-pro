<template>
    <div>login</div>
</template>

<script lang="ts" setup>
// import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue";
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
console.log(`userStore: ${JSON.stringify(userStore)}`);
</script>

<style scoped></style>