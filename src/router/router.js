import { createRouter, createMemoryHistory } from 'vue-router'

// Importando componentes
import Dashboard from '../views/TelaDashboard.vue'
import Estoque from '../views/TelaEstoque.vue'
import Login from '../views/TelaLogin.vue'
import EsqueceuSenha from '../views/TelaEsqueceuSenha.vue'
import Cadastro from '../views/TelaCadastro.vue'

// DummyService importado
import DummyService from '../services/DummyService'

// Cria a instância da rota
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/:notFound(.*)', redirect: '/dashboard' },
    { path: '/', redirect: '/dashboard' },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      props: route => ({ user: DummyService[route.query.user || 'usuario1'] }),
    },
    {
      path: '/estoque',
      name: 'Estoque',
      component: Estoque,
      props: route => ({ user: DummyService[route.query.user || 'usuario1'] }),
    },
    { path: '/login', component: Login },
    { path: '/esquecisenha', component: EsqueceuSenha },
    { path: '/cadastro', component: Cadastro },
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
