<template>
  <div class="page">
    <TheNavigation />
    <TelaEstoque />
  </div>
</template>

<script>
import TheNavigation from "./components/layout/TheNavigation";
import TelaEstoque from "./views/TelaEstoque.vue";
export default {
  components: {
    TelaEstoque,
    TheNavigation,
  },
};
</script>

<style scoped>
.page {
  position: relative;
  display: flex;
  flex-direction: row;
  height: calc(100vh + 5rem);
  background-color: var(--lima);
}
</style>
