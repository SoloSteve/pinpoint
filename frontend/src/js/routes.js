import HomePage from '../pages/home.vue';
import NotFoundPage from '../pages/404.vue';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
