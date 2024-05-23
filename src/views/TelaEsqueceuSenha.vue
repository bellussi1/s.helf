<template>
  <div class="form-container">
    <div class="logo-container">
      Esqueci minha senha
    </div>

    <form class="form">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" id="email" name="email" placeholder="Coloque seu email" required="">
      </div>

      <button class="form-submit-btn" type="submit">Enviar email</button>
    </form>

    <p class="signup-link">
      Não tem uma conta?
      <a href="#" class="signup-link link" @click="redirectToSignUp"> Cadastrar</a>
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToSignUp() {
      this.$emit('go-to-signup'); // Emitir evento para mudar para a tela de cadastro
    }
  }
}
</script>




<style scoped>
.form-container {
  
  background-color: #fff;
  padding: 32px 24px;
  font-size: 14px;
  font-family: inherit;
  color: #212121;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  
box-shadow: 10px 10px 64px 0px rgba(180, 180, 207, 0.75);
  -webkit-box-shadow: 10px 10px 64px 0px rgba(186, 186, 202, 0.75);
  -moz-box-shadow: 10px 10px 64px 0px rgba(208, 208, 231, 0.75);
}

.form-container button:active {
  scale: 0.95;
}

.form-container .logo-container {
  
  font-weight: 600;
  font-size: 1rem;
  color: var(--verde-agua);
}

.form-container .form {
  display: flex;
  flex-direction: column;
}

.form-container .form-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.form-container .form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-container .form-group input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 6px;
  font-family: inherit;
  border: 1px solid #ccc;
}

.form-container .form-group input::placeholder {
  opacity: 0.5;
}

.form-container .form-group input:focus {
  outline: none;
  border-color: #1778f2;
}

.form-container .form-submit-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  color: #fff;
  background-color: var(--verde-agua);
  border: none;
  width: 100%;
  padding: 12px 16px;
  font-size: inherit;
  gap: 8px;
  margin: 12px 0;
  cursor: pointer;
  border-radius: 6px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
}



.form-container .link {
  color: #1778f2;
  text-decoration: none;
}

.form-container .signup-link {
  align-self: center;
  font-weight: 500;
}

.form-container .signup-link .link {
  font-weight: 400;
  cursor:pointer;
  color: var(--verde-agua);
  font-size: 0.6rem;
}

.form-container .link:hover {
  text-decoration: underline;
}

label{
    color: #b2bac8;
  font-size: 0.8rem;
  display: block;
  padding-bottom: 0.2rem;
}
p{
    color: #b2bac8;
  font-size: 0.6rem;
  display: block;
  padding-bottom: 0.2rem;
}

</style>