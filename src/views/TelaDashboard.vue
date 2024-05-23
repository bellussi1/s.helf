<template>
  <div class="dashboard">
    <div class="charts" v-if="isDataReady">
      <h1 class="title">Estatísticas</h1>
      <DashboardYear :years="years" @year-selected="updateSelectedYear" />

      <DashboardChart
        v-if="billingData.length"
        title="Faturamento"
        :data="billingData"
        :bestMonth="bestBillingMonth"
        :selected="selectedChart === 'billing'"
        type="currency"
        @click="selectChart('billing')"
      />
      <DashboardChart
        v-if="salesData.length"
        title="Vendas"
        :data="salesData"
        :bestMonth="bestSalesMonth"
        :selected="selectedChart === 'sales'"
        type="integer"
        @click="selectChart('sales')"
      />
      <DashboardChart
        v-if="averageTicketData.length"
        title="Ticket Médio"
        :data="averageTicketData"
        :bestMonth="bestAverageTicketMonth"
        :selected="selectedChart === 'averageTicket'"
        type="currency"
        @click="selectChart('averageTicket')"
      />
    </div>
    <div class="selected-chart" v-if="isDataReady">
      <DashboardSelectedChart
        v-if="selectedChart === 'billing'"
        title="Faturamento"
        :data="billingData"
        type="currency"
      />
      <DashboardSelectedChart
        v-else-if="selectedChart === 'sales'"
        title="Vendas"
        :data="salesData"
        type="integer"
      />
      <DashboardSelectedChart
        v-else-if="selectedChart === 'averageTicket'"
        title="Ticket Médio"
        :data="averageTicketData"
        type="currency"
      />
      <DashboardTable :data="tableData" />
    </div>
  </div>
</template>

<script>
import DashboardYear from "../components/Dashboard/DashboardYear";
import DashboardChart from "../components/Dashboard/DashboardChart";
import DashboardTable from "../components/Dashboard/DashboardTable";
import DashboardSelectedChart from "../components/Dashboard/DashboardSelectedChart";

export default {
  props: ["user"],
  components: {
    DashboardTable,
    DashboardYear,
    DashboardChart,
    DashboardSelectedChart,
  },
  data() {
    return {
      selectedYear: new Date().getFullYear(),
      years: [],
      billingData: [],
      salesData: [],
      averageTicketData: [],
      bestBillingMonth: null,
      bestSalesMonth: null,
      bestAverageTicketMonth: null,
      selectedChart: "billing",
      isDataReady: false, // Nova propriedade para controlar a renderização
    };
  },
  created() {
    this.years = this.getYears();
    this.updateChartData();
  },

  methods: {
    selectChart(chart) {
      this.selectedChart = chart;
    },
    updateSelectedYear(year) {
      this.selectedYear = year;
      this.updateChartData();
    },
    updateChartData() {
      this.billingData = this.getBillingData();
      this.salesData = this.getSalesData();
      this.averageTicketData = this.getAverageTicketData();

      this.bestBillingMonth = this.getBestMonth(this.billingData);
      this.bestSalesMonth = this.getBestMonth(this.salesData);
      this.bestAverageTicketMonth = this.getBestMonth(this.averageTicketData);

      this.isDataReady = true; // Dados prontos para renderizar os gráficos
    },
    getBestMonth(data) {
      if (data.length === 0) return null;
      let bestMonth = data[0];
      for (let i = 1; i < data.length; i++) {
        if (data[i].value > bestMonth.value) {
          bestMonth = data[i];
        }
      }
      return bestMonth;
    },
    getYears() {
      const years = [];
      this.user.sales.forEach((sale) => {
        const year = new Date(sale.date).getFullYear();
        if (!years.includes(year)) {
          years.push(year);
        }
      });
      return years.sort();
    },
    getBillingData() {
      const sales = this.user.sales.filter(
        (sale) => new Date(sale.date).getFullYear() === this.selectedYear
      );
      const groupedSales = sales.reduce((acc, sale) => {
        const month = new Date(sale.date).getMonth();
        const product = this.user.products.find(
          (product) => product.id === sale.productId
        );
        if (!acc[month]) {
          acc[month] = {
            label: `0${month + 1}/${this.selectedYear}`,
            value: 0,
          };
        }
        acc[month].value += product.price * sale.quantity;
        return acc;
      }, {});
      return Object.values(groupedSales);
    },
    getSalesData() {
      const sales = this.user.sales.filter(
        (sale) => new Date(sale.date).getFullYear() === this.selectedYear
      );
      const groupedSales = sales.reduce((acc, sale) => {
        const month = new Date(sale.date).getMonth();
        if (!acc[month]) {
          acc[month] = {
            label: `0${month + 1}/${this.selectedYear}`,
            value: 0,
          };
        }
        acc[month].value += sale.quantity;
        return acc;
      }, {});
      return Object.values(groupedSales);
    },
    getAverageTicketData() {
      const billingData = this.getBillingData();
      const salesData = this.getSalesData();
      return billingData.map((item, index) => ({
        label: item.label,
        value: salesData[index] ? item.value / salesData[index].value : 0,
      }));
    },
  },
  computed: {
    tableData() {
      const billingData = this.getBillingData();
      const salesData = this.getSalesData();
      const averageTicketData = this.getAverageTicketData();
      return billingData.map((item, index) => ({
        label: item.label,
        billing: item.value,
        sales: salesData[index] ? salesData[index].value : 0,
        averageTicket: averageTicketData[index]
          ? averageTicketData[index].value
          : 0,
      }));
    },
  },
};
</script>


<style scoped>
.dashboard {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  color: var(--light-gray);
  background-color: #fff;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin: 1rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.25);
  transition: width 0.2s ease-in-out;
}

.dashboard h1 {
  background-color: #fff;
  font-size: 1rem;
  border-bottom: 1px solid var(--lima);
  border-top: 1px solid var(--lima);
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  align-self: flex-start;
  width: 100%;
}
.charts {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  width: 25%;
  height: 100%;
  transition: width 0.2s ease-in-out;
}
.selected-chart {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  width: 70%;

  transition: width 0.2s ease-in-out;
}
</style>