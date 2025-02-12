import { createRouter, createWebHistory } from 'vue-router';
// import App from '../App.vue'; // 不需要導入 App.vue
import GGComponent from '../components/GG.vue';
import NOTE from '../components/NoTe.vue';
const routes = [
   {
     path: '/',
     component: NOTE,
   },
  {
    path: '/gg',
    component: GGComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
