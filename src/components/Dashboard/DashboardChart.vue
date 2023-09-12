<template>
  <div
    class="dashboard-chart"
    @click="$emit('click')"
    v-bind:class="{ selected: selected }"
  >
    <div>
      <h2>{{ title }}</h2>
      <div class="value">{{ formattedValue }}</div>
      <span>Melhor mês: {{ formattedBestMonth }}</span>
      <font-awesome-icon class="icon" :icon="['fas', 'chevron-right']" />
    </div>

    <apexchart
      width="100%"
      height="100%"
      type="line"
      :options="chartOptions"
      :series="chartData"
    />
  </div>
</template>
  
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    bestMonth: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator: (value) => ["currency", "integer"].includes(value),
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formattedBestMonth() {
      if (this.bestMonth && this.isValidMonth(this.bestMonth.label)) {
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
        const monthIndex = parseInt(this.bestMonth.label, 10) - 1;
        return monthNames[monthIndex];
      } else {
        return null;
      }
    },
    chartData() {
      return [
        {
          data: this.data.map((item) => ({ x: item.label, y: item.value })),
        },
      ];
    },
    chartOptions() {
      return {
        chart: {
          type: "line",
          toolbar: {
            show: false,
          },
        },
        colors: ["#2dd1ac"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        tooltip: {
          enabled: false,
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        grid: {
          show: true,
          borderColor: "#fff",
          strokeDashArray: 0,
          position: "back",
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
          row: {
            colors: undefined,
            opacity: 0.5,
          },
          column: {
            colors: undefined,
            opacity: 0.5,
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      };
    },

    totalValue() {
      return this.data.reduce((total, item) => total + item.value, 0);
    },
    formattedValue() {
      if (this.type === "currency") {
        return this.totalValue.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      } else if (this.type === "integer") {
        return this.totalValue.toLocaleString("pt-BR");
      } else {
        // valor de retorno padrão para tipos não reconhecidos
        return this.totalValue;
      }
    },
  },
  methods: {
    isValidMonth(month) {
      const monthInt = parseInt(month, 10);
      return !isNaN(monthInt) && monthInt >= 1 && monthInt <= 12;
    },
  },
};
</script>
  

<style scoped>
.dashboard-chart {
  cursor: pointer;
  padding: 1rem 0.5rem 0 0.5rem;
  width: 100%;
  height: 25%;
  align-self: flex-end;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--cinza-atemporal);
  transition: width 0.2s ease-in-out;
}
.dashboard-chart.selected {
  background-color: var(--verde-claro);
  border-left: 3px solid var(--verde-agua);
  transition: width 0.2s ease-in-out;
}
.dashboard-chart div {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: space-around;
  width: 100%;
}
.dashboard-chart h2 {
  font-size: 0.85rem;
}

.dashboard-chart .value {
  color: var(--verde-agua);
  font-size: 1.1rem;
}
.dashboard-chart span {
  color: var(--light-gray);
  font-size: 0.7rem;
  white-space: nowrap;
}

.icon {
  font-size: 0.7rem;
}
</style>