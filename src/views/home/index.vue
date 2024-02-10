<template>
  <div>home {{ homeValue }}</div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from "vue";
let homeValue = ref(0);
setTimeout(() => {
  console.log(1111);

  homeValue.value = 11111;
}, 0);

setTimeout(() => {
  console.log(22222);
  homeValue.value = 22222;
}, 1000);

Promise.resolve().then(() => {
  console.log(33333);
  homeValue.value = 33333;
});
nextTick(() => {
  console.log(4444);
  homeValue.value = 4444;
});
</script>

<style scoped></style>
