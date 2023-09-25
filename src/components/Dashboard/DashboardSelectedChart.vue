<template>
  <div class="dashboard-chart">
    <div class="title-button">
      <h2>{{ title }}</h2>
      <div class="radio-button">
        <div class="tabs">
          <div v-for="(opcao, index) in opcoes" :key="index">
            <input
              :id="'radio-' + (index + 1)"
              type="radio"
              name="tabs"
              :value="opcao"
              v-model="chartType"
              @change="toggleChartType"
            />
            <label :for="'radio-' + (index + 1)" class="tab">
              <font-awesome-icon :icon="iconClass(opcao)" />
            </label>
          </div>
          <span class="glider" :class="gliderClass"></span>
        </div>
      </div>
    </div>

    <div class="chart">
      <apexchart
        :key="chartType"
        width="100%"
        height="100%"
        :type="chartType"
        :options="chartOptions"
        :series="chartData"
      />
    </div>
  </div>
</template>

  
  <script>
const months = [
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

export default {
  data() {
    return {
      opcoes: ["line", "bar"],
      chartType: "line",
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },

    type: {
      type: String,
      required: true,
      validator: (value) => ["currency", "integer"].includes(value),
    },
  },
  computed: {
    gliderClass() {
      return "glider-" + (this.opcoes.indexOf(this.chartType) + 1);
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

        markers: {
          size: 6,
        },
        tooltip: {
          y: {
            title: {
              formatter: () => this.title,
            },
            formatter: (value) => {
              if (this.type === "currency") {
                return `R$ ${value.toFixed(2).replace(".", ",")}`;
              } else if (this.type === "integer") {
                return value.toFixed(0);
              } else {
                return value;
              }
            },
          },
        },
        xaxis: {
          type: "category",
          labels: {
            rotateAlways: true,
            style: {
              fontFamily: "Poppins",
              colors: "#606a7d",
            },
            formatter: (value) => {
              const monthIndex = parseInt(value, 10) - 1;
              return months[monthIndex];
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              fontFamily: "Poppins",
              colors: "#606a7d",
            },
            formatter: (value) => {
              if (this.type === "currency") {
                return `R$ ${value.toFixed(2).replace(".", ",")}`;
              } else if (this.type === "integer") {
                return value.toFixed(0);
              } else {
                return value;
              }
            },
          },
        },
        grid: {
          show: true,
          borderColor: "#e0e0e0",
          strokeDashArray: 0,
          position: "back",
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
          row: {
            colors: ["transparent"],
            opacity: 0.5,
          },
        },
      };
    },
  },
  methods: {
    toggleChartType() {
      
      this.isBarChart = !this.isBarChart;
    },
    iconClass(opcao) {
      return opcao === "line" ? ["fas", "chart-line"] : ["fas", "chart-column"];
    },
  },
};
</script>
  
    
  
  <style scoped>
.dashboard-chart {
  display: flex;
  flex-flow: column;
  height: 75%;
  width: 100%;
  transition: width 0.2s ease-in-out;
}
.title-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row;
}
.dashboard-chart h2 {
  background-color: #fff;
  font-size: 1rem;
  border-bottom: 1px solid var(--lima);
  border-top: 1px solid var(--lima);
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
}
.chart {
  align-self: flex-start;
  padding: 1rem 0 0 0;
  margin: 0 0 1rem 0;
  width: 100%;
  height: 100%;
  transition: width 0.2s ease-in-out;
}

.radio-button {
  margin-left: auto;
}
.tabs {
  display: flex;
  position: relative;
  background-color: #fff;
  box-shadow: 0 0 1px 0 rgba(24, 94, 224, 0.15),
    0 2px 15px 0 rgba(24, 94, 224, 0.15);
  padding: 0.25rem 0.5rem;
  border-radius: 2rem;
}

.tabs * {
  z-index: 2;
}

.radio-button input[type="radio"] {
  display: none;
}

.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 50px;

  color: var(--cinza-atemporal);
  font-weight: 500;
  border-radius: 99px;
  cursor: pointer;
  transition: color 0.15s ease-in;
}

.radio-button input[type="radio"]:checked + label {
  color: var(--verde-agua);
}

.glider-1,
.glider-2 {
  position: absolute;
  display: flex;
  height: 30px;
  width: 50px;
  background-color: var(--verde-claro);
  z-index: 1;
  border-radius: 1rem;
  transition: 0.25s ease-out;
}
.glider-2 {
  transform: translateX(100%);
}
</style>