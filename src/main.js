// import { createApp } from 'vue'
import * as Vue from 'vue'
import App from './App.vue'
// import router from './router/router.js'

// Icones
import fontawesome from './assets/fonts/fontAwesome.js'

// Import um arquivo CSS para estilização global
import './assets/global.css'
import './assets/colors.css'

const app = Vue.createApp(App)

// app.use(router)
app.use(fontawesome)
app.mount('#app')
