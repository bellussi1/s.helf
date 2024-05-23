<template>
  <form class="form card" @submit.prevent="doLogin">
    <div class="card_header">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path
          fill="currentColor"
          d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z"
        ></path>
      </svg>
      <h1 class="form_heading">Login</h1>
    </div>
    <div class="field">
      <label for="username">Usuário</label>
      <input
        class="input"
        name="username"
        v-model="username"
        type="text"
        placeholder="Usuário"
        id="username"
      />
    </div>
    <div class="field">
      <label for="password">Senha</label>
      <input
        class="input"
        name="user_password"
        v-model="password"
        type="password"
        placeholder="Senha"
        id="password"
      />
    </div>
    <a @click.prevent="esqueciSenha" class="forget__password"
      >Esqueceu sua senha?</a
    >
    <div class="field">
      <button class="button">Login</button>
    </div>
    <p>
      Ainda não tem uma conta?
      <a @click.prevent="fazerCadastro" class="forget__password"
        >Cadastre-se!</a
      >
    </p>
  </form>
</template>
<script>
import DummyAuth from "../services/DummyAuth";
import users from "../services/DummyService";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async doLogin() {
      if (DummyAuth[this.username] === this.password) {
        const user = users[this.username]; // Obter todas as informações do usuário
        this.$emit("do-login", user); // Emitir evento de login com todas as informações do usuário
        this.$router.push("/dashboard"); // Redirecionar para a rota "/dashboard"
      } else {
        alert("Usuário ou senha incorretos!");
      }
    },
    esqueciSenha() {
      this.$emit("show-reset-password"); // Emitir evento para mostrar a tela de recuperação de senha
    },

    fazerCadastro() {
      this.$emit("show-register"); // Emitir evento para mostrar a tela de cadastro
    },
  },
};
</script>


  
  <style scoped>
.card {
  width: 15rem;
  height: 22rem;
  background: #fff;
  border: 1px solid white;
  box-shadow: 10px 10px 64px 0px rgba(180, 180, 207, 0.75);
  -webkit-box-shadow: 10px 10px 64px 0px rgba(186, 186, 202, 0.75);
  -moz-box-shadow: 10px 10px 64px 0px rgba(208, 208, 231, 0.75);
}

.form {
  padding: 1.25rem;
}

.card_header {
  display: flex;
  align-items: center;
}

.card svg {
  color: var(--verde-agua);
  margin-bottom: 1rem;
  margin-right: 0.1rem;
}

.form_heading {
  padding-bottom: 1rem;
  font-size: 1.5rem;
  color: var(--verde-agua);
}

.field {
  padding-bottom: 10px;
}

.input {
  border-radius: 5px;
  background-color: #e9e9f7;
  padding: 0.3rem;
  width: 100%;
  color: #7a7ab3;
  border: 1px solid #dadaf7;
}

.input:focus-visible {
  outline: 1px solid #aeaed6;
}

.input::placeholder {
  color: #bcbcdf;
}

label {
  color: #b2bac8;
  font-size: 0.8rem;
  display: block;
  padding-bottom: 0.2rem;
}

button {
  background-color: var(--verde-agua);
  margin-top: 1rem;
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;

  font-weight: 500;
  color: white;
  border: none;
}

button:hover {
  background-color: var(--verde-escuro);
  cursor: pointer;
}

.forget__password {
  cursor: pointer;
  color: var(--verde-agua);
  font-size: 0.6rem;
}

p {
  font-size: 0.6rem;
}
</style>
  