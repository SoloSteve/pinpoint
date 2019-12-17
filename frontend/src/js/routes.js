import Navigation from '../pages/navigation.vue';
import NotFoundPage from '../pages/404.vue';

const routes = [
  {
    path: '/',
    component: Navigation,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
