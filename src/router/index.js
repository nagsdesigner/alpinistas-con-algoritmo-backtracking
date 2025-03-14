import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Resultados from '../views/Resultados.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/resultados', component: Resultados }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
