// Importa a função createRouter do pacote Vue-Router
import { createRouter, createMemoryHistory } from 'vue-router'

// Importando componente
// import Dashboard from '../views/TelaDashboard.vue'
// import Cadastros from '../views/TelaCadastros.vue'
// import Estoque from '../views/TelaEstoque.vue'
// import Vendas from '../views/TelaVendas.vue'
// import Consultas from '../views/TelaConsultas.vue'

// Cria a intância da rota
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/:notFound(.*)', redirect: '/' },
    { path: '/', redirect: '/' },

    // { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    // { path: '/cadastros', name: 'Cadastros', component: Cadastros },
    // { path: '/estoque', name: 'Estoque', component: Estoque },
    // { path: '/vendas', name: 'Vendas', component: Vendas },
    // { path: '/consultas', name: 'Consultas', component: Consultas },
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { left: 0, top: 0, behavior: 'smooth' }
  },
})

export default router
