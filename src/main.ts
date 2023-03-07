import { createApp } from 'vue';

import * as VueRouter from 'vue-router';

import App from './App';

import routes from './routes';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
});

createApp(App).use(router).mount('#app');
