<template>
  <div class="page">
    <div class="login" v-if="!isLoggedIn">
      <TelaLogin @do-login="doLogin" />
    </div>

    <TheNavigation v-if="isLoggedIn" />
    <router-view v-slot="{ Component }" v-if="isLoggedIn">
      <transition name="fade" mode="out-in">
        <component :is="Component" :user="currentUser" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import TelaLogin from "./views/TelaLogin";
import TheNavigation from "./components/layout/TheNavigation";

export default {
  components: {
    TelaLogin,
    TheNavigation,
  },
  data() {
    return {
      isLoggedIn: false, // novo estado de login
      currentUser: null, // novo estado para o usuário atualmente logado
    };
  },
  methods: {
    doLogin(user) {
      this.isLoggedIn = true;
      this.currentUser = user; // atualiza o estado currentUser com o nome do usuário
    },
  },
};
</script>



<style scoped>
.page {
  overflow-y: hidden;
  position: relative;
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-color: var(--lima);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
