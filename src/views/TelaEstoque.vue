<template>
  <div class="estoque">
    <h1 class="title">{{ filteredProducts.length }} Itens cadastrados</h1>
    <div class="header">
      <EstoqueSearch
        :products="products"
        @filtered-products="updateFilteredProducts"
      />

      <EstoqueAdd @add-product="addProduct" />
    </div>
    <div class="table">
      <EstoqueTable :products="filteredProducts" />
    </div>
    <EstoqueSummary :products="products" />
  </div>
</template>

<script>
import EstoqueTable from "../components/Estoque/EstoqueTable";
import EstoqueSearch from "../components/Estoque/EstoqueSearch";
import EstoqueAdd from "../components/Estoque/EstoqueAdd";
import EstoqueSummary from "../components/Estoque/EstoqueSummary";

import DummyService from "../services/DummyService";

export default {
  components: {
    EstoqueTable,
    EstoqueSearch,
    EstoqueAdd,
    EstoqueSummary,
  },
  data() {
    return {
      products: DummyService.products,
      filteredProducts: [],
    };
  },
  created() {
    this.filteredProducts = this.products;
  },
  methods: {
    updateFilteredProducts(filteredProducts) {
      this.filteredProducts = filteredProducts;
    },
    addProduct(newProduct) {
      this.products.push(newProduct);
    },
  },
};
</script>

<style scoped>
.estoque {
  position: relative;
  width: 100%;

  color: var(--light-gray);
  background-color: #fff;
  display: flex;
  flex-flow: column nowrap;
  margin: 1rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.25);
}

.title {
  background-color: #fff;
  font-size: 1rem;
  border-bottom: 1px solid var(--lima);
  border-top: 1px solid var(--lima);
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
}

.header {
  padding: 0.5rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: row wrap;
}
</style>