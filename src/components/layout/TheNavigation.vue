<template>
  <div class="radio-inputs">
    <div class="switch">
      <input type="checkbox" />
      <div>
        <span class="line-1"></span>
        <span class="line-2"></span>
        <span class="line-3"></span>
      </div>
    </div>
    <div class="user">
      <font-awesome-icon :icon="['fas', 'user']" />
    </div>
    <label class="radio">
      <input type="radio" name="radio" checked="" />
      <router-link class="name" to="/"
        ><font-awesome-icon :icon="['fas', 'chart-simple']"
      /></router-link>
    </label>
    <label class="radio">
      <input type="radio" name="radio" />
      <router-link class="name" to="/"
        ><font-awesome-icon :icon="['fas', 'boxes-stacked']"
      /></router-link>
    </label>

    <label class="radio">
      <input type="radio" name="radio" />
      <router-link class="name" to="/"
        ><font-awesome-icon :icon="['fas', 'users']"
      /></router-link>
    </label>
  </div>
</template>
  
<script>
export default {
  data() {
    return {};
  },
};
</script>
  
<style scoped>
.radio-inputs {
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  left: 0;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  background-color: var(--gray);
  box-sizing: border-box;
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.5rem;
  width: 3rem;

  font-size: 1.25rem;
}

.radio-inputs .radio input {
  display: none;
}

.radio-inputs .radio .name {
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: none;
  width: 2rem;
  height: 2rem;
  aspect-ratio: 1/1;
  padding: 0.5rem;
  color: var(--light-gray);
  transition: all 0.15s ease-in-out;
}

.radio-inputs .radio input:checked + .name {
  background-color: var(--light-gray);
  color: #fff;
}

.user {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--gray);
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  border-radius: 100%;
  width: 2.5rem;
  height: 2.5rem;
  aspect-ratio: 1/1;
  margin: 0.5rem 0 1.5rem 0;
}

.switch {
  position: relative;
  cursor: pointer;

  width: 1.75rem;
  height: 1.75rem;
  margin: 0.5rem 0 0 0;

  border-radius: 5px;
}

.switch input {
  opacity: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  cursor: pointer;
  position: absolute;
}

.switch div {
  width: 80%;
  height: 80%;
  margin: 10%;
  position: absolute;
}

.switch span {
  background-color: var(--light-gray);
  width: 100%;
  height: 2px;
  border-radius: 5px;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.5s, width 0.5s;
}

.switch .line-1 {
  width: 50%;
  transform: translate(-100%, -10px);
  transform-origin: 0 0;
}

.switch .line-3 {
  width: 50%;
  left: auto;
  right: 0;
  transform: translate(0, 10px);
  transform-origin: 100% 0;
}

input:checked + div span.line-1 {
  transform: translate(0, 0) rotate(-45deg);
}

input:checked + div span.line-3 {
  transform: translate(-100%, 0) rotate(-45deg);
}

input:checked + div span.line-2 {
  transform: translate(-50%, -50%) rotate(45deg);
}
</style>
  