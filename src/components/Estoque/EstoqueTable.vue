<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <th @click="sortTable('name')">
            Nome
            <font-awesome-icon
              class="icon"
              :icon="sortIcon('name')"
            ></font-awesome-icon>
          </th>
          <th @click="sortTable('price')">
            Preço
            <font-awesome-icon
              class="icon"
              :icon="sortIcon('price')"
            ></font-awesome-icon>
          </th>
          <th>Categoria</th>
          <th @click="sortTable('stock')">
            Estoque
            <font-awesome-icon
              class="icon"
              :icon="sortIcon('stock')"
            ></font-awesome-icon>
          </th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in sortedProducts" :key="product.name">
          <td>{{ product.name }}</td>
          <td>R$ {{ product.price }}</td>

          <td>{{ product.category }}</td>
          <td>{{ product.stock }}</td>
          <td>
            <button @click="$emit('edit-product', product)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="currentPage--" :class="{ disabled: currentPage === 1 }">
        <font-awesome-icon class="icon-page" :icon="['fas', 'chevron-left']" />
      </button>
      <div
        class="total-page"
        v-for="page in totalPages"
        :key="page"
        :class="{ active: currentPage === page }"
        @click="currentPage = page"
      >
        {{ page }}
      </div>
      <button
        @click="currentPage++"
        :class="{ disabled: currentPage === totalPages }"
      >
        <font-awesome-icon class="icon-page" :icon="['fas', 'chevron-right']" />
      </button>
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
  data() {
    return {
      currentSort: "",
      currentSortDir: "asc",
      currentPage: 1,
    };
  },
  computed: {
    sortedProducts() {
      let productsCopy = [...this.products];
      let sorted = productsCopy.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });

      // Paginação
      const startIndex = (this.currentPage - 1) * 10;
      return sorted.slice(startIndex, startIndex + 10);
    },
    totalPages() {
      return Math.ceil(this.products.length / 10);
    },
  },
  methods: {
    sortIcon(column) {
      if (this.currentSort === column) {
        if (this.currentSortDir === "asc") return ["fas", "caret-up"];
        else return ["fas", "caret-down"];
      } else {
        return ["fas", "sort"];
      }
    },
    sortTable(column) {
      if (column === this.currentSort) {
        if (this.currentSortDir === "asc") {
          this.currentSortDir = "desc";
        } else {
          this.currentSort = "";
          this.currentSortDir = "asc";
        }
      } else {
        this.currentSort = column;
        this.currentSortDir = "asc";
      }
    },
  },
};
</script>
  
<style scoped>
.table {
  height: 100%;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: auto;
  width: 100%;
  gap: 0.5rem;
  transition: all 0.2s ease-in-out;
}

.pagination button {
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;

  border: none;
  background-color: #fff;
  color: var(--verde-agua);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.pagination button.disabled {
  cursor: default;

  color: var(--cinza-atemporal);
  transition: all 0.2s ease-in-out;
}
.pagination .total-page {
  cursor: pointer;
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid var(--verde-agua);
  color: var(--cinza-seguranca);
  font-size: 0.8rem;
  width: 1rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
}
.pagination .total-page.active {
  background-color: var(--verde-agua);
  color: #fff;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
}

table {
  height: 100%;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  transition: all 0.3s;
  padding: 1rem 0.5rem;

  background-color: #fff;
}

thead {
  background-color: var(--lima);
  font-size: 0.75rem;
}

tbody {
  background-color: #fff;
  font-size: 0.65rem;
}

th,
td {
  padding: 10px;

  text-align: center;
  position: relative;
}

td {
  border-bottom: 1px solid var(--cinza-atemporal);
}
th:first-child,
td:first-child {
  text-align: left;
}

th::after {
  content: "";
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

tr {
  border-bottom: 1px solid var(--gray);
  transition: all 0.3s;
}

tbody tr:hover {
  background-color: #fafafa;
}

thead td:first-child,
thead th:first-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

thead td:last-child,
thead th:last-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.icon {
  margin: 0 0 0 0.25rem;
  font-size: 0.7rem;
  cursor: pointer;
}

button {
  cursor: pointer;

  font-family: inherit;
  border: none;
  padding: 0.25rem 0.5rem;

  font-size: 0.65rem;

  background-color: var(--verde-agua);
  color: #fff;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
}
button:hover {
  transform: scale(1.02);
  transition: all 0.2s ease-in-out;
}
</style>
