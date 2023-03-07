import * as VueRouter from 'vue-router';

export default [
  { path: '/', component: () => import('@/pages/Home') },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/404')
  }
] as VueRouter.RouteRecordRaw[];
