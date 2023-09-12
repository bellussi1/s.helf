<template>
  <div class="input-container">
    <input
      type="text"
      v-model="searchTerm"
      @input="filterProducts"
      placeholder="Pesquisar produtos..."
    />
    <font-awesome-icon class="input-icon" :icon="['fas', 'search']" />
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    filterProducts() {
      const filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.$emit("filtered-products", filteredProducts);
    },
  },
};
</script>

<style scoped>
.input-container {
  position: relative;

  align-items: center;
}

.input-icon {
  position: absolute;
  font-size: 1rem;
  right: 0%;
  top: 10%;
  padding: 0.25rem;
  color: var(--cinza-atemporal);
}

input {
  width: 12rem;
  border: 1px solid var(--cinza-atemporal);
  color: var(--cinza-atemporal);
  border-radius: 8px;
  padding: 0.4rem 0.5rem;
  transition: all 0.25s ease-in-out;
}
input:focus {
  outline: none;
  transform: scale(1.025);
  transition: all 0.25s ease-in-out;
}

::placeholder {
  color: var(--cinza-atemporal);
}
</style>
