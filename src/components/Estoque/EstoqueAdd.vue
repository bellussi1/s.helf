<template>
  <div>
    <button @click="showForm = true">
      <font-awesome-icon class="icon" :icon="['fas', 'plus']" />
      Adicionar Produto
    </button>
    <div class="modal" v-if="showForm">
      <div class="modal-content">
        <div class="modal-inputs">
          <h3>Adicionar Produto</h3>
          <label for="product-name">Nome *</label>
          <input id="product-name" type="text" v-model="newProduct.name" />
          <label for="product-category">Categoria *</label>
          <input
            id="product-category"
            type="text"
            v-model="newProduct.category"
            @keypress="validateCategoryInput"
          />
          <label for="product-price">Preço Unitário *</label>
          <input
            id="product-price"
            type="text"
            v-model="formattedPrice"
            placeholder="R$"
            @input="updatePrice"
          />
          <!-- Adicione os campos minStock e maxStock aqui -->
          <div class="stock-range">
            <div class="stock">
              <label for="product-stock-min">Estoque Mínimo *</label>
              <input
                id="product-stock-min"
                type="number"
                v-model.number="newProduct.minStock"
              />
            </div>

            <div class="stock">
              <label for="product-stock-max">Estoque Máximo *</label>
              <input
                id="product-stock-max"
                type="number"
                v-model.number="newProduct.maxStock"
              />
            </div>
          </div>

          <label for="product-stock">Estoque Atual *</label>
          <input
            id="product-stock"
            type="number"
            v-model.number="newProduct.stock"
          />
        </div>
        <div class="button-container">
          <button
            class="modal-button"
            @click="addProduct"
            :class="{ 'disabled-button': !isFormValid }"
            :disabled="!isFormValid"
          >
            Adicionar
          </button>
          <button class="close-button" @click="showForm = false">
            Cancelar
          </button>
        </div>
        <p>(*) Campos obrigatórios</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showForm: false,
      newProduct: {
        name: "",
        price: 0,
        minStock: 0,
        maxStock: 0,
        category: "",
        stock: 0,
      },
    };
  },
  computed: {
    isFormValid() {
      return (
        this.newProduct.name &&
        this.newProduct.price &&
        this.newProduct.category &&
        this.newProduct.stock &&
        this.newProduct.minStock &&
        this.newProduct.maxStock
      );
    },
    formattedPrice() {
      return this.newProduct.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  methods: {
    addProduct() {
      this.$emit("add-product", { ...this.newProduct });
      this.newProduct = {
        name: "",
        price: 0,
        minStock: 0,
        maxStock: 0,
        category: "",
        stock: 0,
      };
      this.showForm = false;
    },
    validateCategoryInput(event) {
      const charCode = event.charCode;
      if (
        (charCode >= 65 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122) ||
        charCode === 32
      ) {
        return true;
      } else {
        event.preventDefault();
        return false;
      }
    },
    updatePrice(event) {
      const value = event.target.value.replace(/\D/g, "");
      this.newProduct.price = parseFloat(value) / 100;
    },
  },
};
</script>




<style scoped>
h3 {
  margin: 0.25rem 0 1rem 0;
  font-size: 1rem;
}

button {
  cursor: pointer;
  display: flex;
  align-content: center;
  font-family: inherit;
  border: none;
  padding: 0.25rem 0.5rem;
  gap: 0.5rem;
  font-size: 0.65rem;
  align-items: center;
  background-color: var(--verde-agua);
  color: #fff;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
}
button:hover {
  transform: scale(1.02);
  transition: all 0.2s ease-in-out;
}
label {
  margin-top: 0.6rem;
  font-size: 0.7rem;
}

input {
  width: 100%;
  border: 1px solid var(--cinza-atemporal);
  border-radius: 6px;
  color: var(--cinza-atemporal);
  padding: 0.25rem 0.25rem;
}
input:focus {
  outline: none;
}
p {
  font-size: 0.6rem;
}
.icon {
  font-size: 1rem;
  font-weight: 400;
}
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  display: flex;
  flex-flow: column;
  position: relative;
  justify-content: space-between;
  background-color: #fefefe;
  padding: 1.5rem 2.5rem;
  border-radius: 8px;
  border: none;
  width: 20rem;
  height: 25rem;
}
.modal-inputs {
  flex-flow: column;
  display: flex;
  justify-content: center;
}
.stock-range {
  width: 100%;
  gap: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.stock {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: flex-start;
}
.button-container {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  gap: 1rem;
}
.modal-button {
  transition: all 0.2s ease-in-out;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.close-button {
  transition: all 0.2s ease-in-out;
  background-color: #fff;
  border: 2px solid var(--gray);
  color: var(--light-gray);
}
.disabled-button {
  cursor: default;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--cinza-atemporal);
  background-color: #fff;
  font-weight: 600;
  color: var(--cinza-atemporal);
}
</style>
  