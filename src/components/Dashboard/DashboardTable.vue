<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <th>Mês</th>
          <th>Faturamento</th>
          <th>Qtd.</th>
          <th>Ticket Médio</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{ formatMonth(item.label) }}</td>
          <td>{{ formatCurrency(item.billing) }}</td>
          <td>{{ formatQuantity(item.sales) }}</td>
          <td>{{ formatCurrency(item.averageTicket) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
  <script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatMonth(label) {
      const monthNames = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];
      const monthNumber = parseInt(label.slice(0, -4), 10) - 1; // Alterado aqui
      return monthNames[monthNumber];
    },

    formatCurrency(value) {
      return `R$ ${value
        .toFixed(2)
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
    },
    formatQuantity(value) {
      return `${value} un.`;
    },
  },
};
</script>
  
 
<style scoped>
.table {
  width: 100%;
  height: 25%;

  overflow-y: auto;
}
table {
  height: 100%;
  width: 100%;

  border-collapse: separate;
  border-spacing: 0;
  transition: all 0.3s;

  position: relative;
  background-color: #fff;
}

thead {
  position: sticky;
  top: 0;
  background-color: var(--lima);
  font-size: 0.75rem;
  z-index: 1;
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
  background-color: #fbfbfb;
}
</style>

  