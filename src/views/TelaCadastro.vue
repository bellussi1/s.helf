<template>
  <form class="form">
    <p class="title">Cadastro</p>
  
    <label>
      <label for="username">Usuário</label>
      <input name="username" required="" placeholder="Usuário" type="text" class="input" >
      
    </label>   
            
    <label>
      <label for="email">Email</label>
      <input name="email" required="" placeholder="Email" type="email" class="input">
   
    </label> 
        
    <label>
      <label for="password">Senha</label>
      <input name="senha" required="" placeholder="Senha" type="password" class="input">
      
    </label>
    
    <label>
      <label for="confirmpassword">Confirmar senha</label>
      <input name="confirmpassword" required="" placeholder="Confirmar senha" type="password" class="input">
     
    </label>
    
    <button class="submit">Confirmar</button>
    
    <p class="signin">Já tem uma conta? <a class="forget__password" href="#" @click="redirectToLogin">Login</a> </p>
  </form>
</template>

<script>
export default {
  methods: {
    redirectToLogin() {
      this.$emit('go-to-login'); // Emitir evento para mudar para a tela de login
    }
  }
}
</script>



<style scoped>
.card {
  width: 15rem;
  height: 22rem;
 
  border: 1px solid white;
  box-shadow: 10px 10px 64px 0px rgba(180, 180, 207, 0.75);
  -webkit-box-shadow: 10px 10px 64px 0px rgba(186, 186, 202, 0.75);
  -moz-box-shadow: 10px 10px 64px 0px rgba(208, 208, 231, 0.75);
}

.form {
    background: #fff;
  min-width: 320px;
  box-shadow: 10px 10px 64px 0px rgba(180, 180, 207, 0.75);
  -webkit-box-shadow: 10px 10px 64px 0px rgba(186, 186, 202, 0.75);
  -moz-box-shadow: 10px 10px 64px 0px rgba(208, 208, 231, 0.75);
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

.title {
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

.forget__password{
cursor:pointer;
  color: var(--verde-agua);
  font-size: 0.6rem;
}

p{
  padding: 0.5rem 0;
  font-size: 0.6rem;
}
</style>
  