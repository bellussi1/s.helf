<template>
  <div class="year-selector">
    <button
      @click="decrementYear"
      :class="{ disabled: selectedYear === years[0] }"
    >
      <font-awesome-icon :icon="['fas', 'chevron-left']" />
    </button>
    <span>Ano: {{ selectedYear }}</span>
    <button
      @click="incrementYear"
      :class="{ disabled: selectedYear === years[years.length - 1] }"
    >
      <font-awesome-icon :icon="['fas', 'chevron-right']" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    years: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedYear: this.years[this.years.length - 1],
    };
  },
  methods: {
    emitYearSelected() {
      this.$emit("year-selected", this.selectedYear);
    },
    incrementYear() {
      if (this.selectedYear < this.years[this.years.length - 1]) {
        this.selectedYear++;
        this.emitYearSelected();
      }
    },
    decrementYear() {
      if (this.selectedYear > this.years[0]) {
        this.selectedYear--;
        this.emitYearSelected();
      }
    },
  },
};
</script>


<style scoped>
.year-selector {
  width: 80%;
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid var(--cinza-atemporal);
  border-radius: 4px;
  padding: 0.5rem 0;
  margin: 0.75rem 0 1rem 0;
  background-color: #fff;
}
.year-selector span {
  font-size: 0.9rem;
}
.year-selector button {
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: var(--verde-agua);
}
.year-selector button.disabled {
  cursor: default;
  color: #ccc;
}
</style>