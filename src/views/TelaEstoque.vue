<template>
  <div class="estoque">
    <h1 class="title">{{ filteredProducts.length }} Itens cadastrados</h1>
    <div class="header">
      <EstoqueSearch
        :products="products"
        @filtered-products="updateFilteredProducts"
      />
      <EstoqueEdit
        v-if="productToEdit"
        :product="productToEdit"
        @update-product="updateProduct"
        @close-edit="closeEdit"
      />
      <EstoqueAdd @add-product="addProduct" />
    </div>
    <div class="table">
      <EstoqueTable :products="filteredProducts" @edit-product="editProduct" />
    </div>
    <div :class="['snackbar', { show: snackbar.show }]">
      {{ snackbar.text }}
    </div>
    <EstoqueSummary :products="products" />
  </div>
</template>

<script>
import EstoqueTable from "../components/Estoque/EstoqueTable";
import EstoqueSearch from "../components/Estoque/EstoqueSearch";
import EstoqueAdd from "../components/Estoque/EstoqueAdd";
import EstoqueEdit from "../components/Estoque/EstoqueEdit";
import EstoqueSummary from "../components/Estoque/EstoqueSummary";

import DummyService from "../services/DummyService";

export default {
  props: ["user"],
  components: {
    EstoqueEdit,
    EstoqueTable,
    EstoqueSearch,
    EstoqueAdd,
    EstoqueSummary,
  },
  data() {
    return {
      snackbar: {
        show: false,
        text: "",
      },
      products: [],
      filteredProducts: [],
      productToEdit: null,
    };
  },
  created() {
    this.products = DummyService[this.user].products;
    this.filteredProducts = this.products;
  },
  methods: {
    showSnackbar(mensagem, callback = () => {}) {
      // Atualiza os dados do snackbar
      this.snackbar.show = true;
      this.snackbar.text = mensagem;

      // Chama a função de retorno após 2 segundos
      setTimeout(() => {
        this.snackbar.show = false;
        callback();
      }, 2000);
    },
    editProduct(product) {
      this.productToEdit = product;
    },
    closeEdit() {
      this.productToEdit = null;
    },
    updateProduct(editedProduct) {
      const index = this.products.findIndex(
        (product) => product.id === editedProduct.id
      );
      this.products[index] = editedProduct;
      this.productToEdit = null;
      this.showSnackbar("Produto editado com sucesso.");
    },
    updateFilteredProducts(filteredProducts) {
      this.filteredProducts = filteredProducts;
    },
    addProduct(newProduct) {
      this.products.push(newProduct);
      this.showSnackbar("Produto adicionado com sucesso.");
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

.snackbar {
  background-color: #566272;
  color: #f5f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1px;
  padding: 0.5rem 0.75rem;
  position: absolute;
  z-index: 1;
  bottom: 0.5rem;
  left: 0.5rem;
  transform: translateY(100px);
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  opacity: 0;
  font-size: 0.8rem;
}

.snackbar.show {
  transform: translateY(0);
  opacity: 1;
}
</style>