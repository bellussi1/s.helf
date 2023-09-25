<template>
  <div class="summary">
    <div class="value-stock">
      VALOR EM ESTOQUE
      <div>
        <p>R$</p>
        <h2>{{ formattedTotalValue }}</h2>
      </div>
    </div>
    <div class="low-out-stock">
      <div class="low-stock">Estoque baixo: {{ lowStockCount }}</div>
      <div class="no-stock">Sem estoque: {{ outOfStockCount }}</div>
    </div>
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
  computed: {
    totalValue() {
      return this.products.reduce(
        (total, product) => total + product.price * product.stock,
        0
      );
    },
    formattedTotalValue() {
      return this.totalValue.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    outOfStockCount() {
      return this.products.filter((product) => product.stock === 0).length;
    },
    lowStockCount() {
      return this.products.filter(
        (product) =>
          product.stock <= product.maxStock * 0.1 && product.stock > 0
      ).length;
    },
  },
};
</script>
  
  
  <style scoped>
.summary {
  background-color: #566272;
  position: fixed;
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  width: 17.5rem;
  padding: 0.5rem 1rem;
  bottom: 1rem;
  right: 1rem;
}
.value-stock {
  font-size: 0.6rem;
  color: #c5c9ce;
}
.value-stock div {
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  gap: 0.5rem;
  align-items: center;
}
.value-stock p {
  font-size: 0.7rem;
}
.value-stock h2 {
  font-size: 1rem;
  font-weight: 400;
  color: #f5f6f6;
}

.low-out-stock {
  margin-right: 1rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-evenly;
}
.low-stock,
.no-stock {
  font-size: 0.6rem;
}

.low-stock {
  color: #e7a13d;
}

.no-stock {
  color: #fb6266;
}
</style>
  