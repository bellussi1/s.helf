<template>
  <div class="page">
    <div
      class="login"
      v-if="!isLoggedIn && !isRegistering && !isResettingPassword"
    >
      <TelaLogin
        @do-login="doLogin"
        @show-register="showRegister"
        @show-reset-password="showResetPassword"
      />
    </div>
    <div class="cadastro">
      <TelaCadastro v-if="isRegistering" @go-to-login="backToLogin" />
      <TelaEsqueceuSenha
        v-if="isResettingPassword"
        @go-to-signup="goToSignUp"
      />
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
import TelaCadastro from "./views/TelaCadastro";
import TelaEsqueceuSenha from "./views/TelaEsqueceuSenha";

export default {
  components: {
    TelaLogin,
    TheNavigation,
    TelaCadastro,
    TelaEsqueceuSenha,
  },
  data() {
    return {
      isLoggedIn: false,
      currentUser: null,
      isRegistering: false,
      isResettingPassword: false,
    };
  },
  methods: {
    doLogin(user) {
      this.isLoggedIn = true;
      this.currentUser = user;
      console.log("Logged in user:", user);
    },
    showRegister() {
      this.isRegistering = true;
      this.isResettingPassword = false;
    },
    showResetPassword() {
      this.isResettingPassword = true;
      this.isRegistering = false;
    },
    backToLogin() {
      this.isRegistering = false;
      this.isResettingPassword = false;
    },
    goToSignUp() {
      this.isResettingPassword = false;
      this.isRegistering = true;
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
.cadastro {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
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
