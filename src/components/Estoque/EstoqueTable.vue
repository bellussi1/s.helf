<template>
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
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in sortedProducts" :key="product.name">
        <td>{{ product.name }}</td>
        <td>R$ {{ product.price }}</td>

        <td>{{ product.category }}</td>
        <td>{{ product.stock }}</td>
      </tr>
    </tbody>
  </table>
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
    };
  },
  computed: {
    sortedProducts() {
      let productsCopy = [...this.products];
      return productsCopy.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
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
  background-color: #f1f1f1;
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
</style>
