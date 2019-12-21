import NavigationPage from '../pages/navigation.vue';
import NotFoundPage from '../pages/404.vue';
import GroupPage from '../pages/group';

const routes = [
  {
    path: '/',
    component: NavigationPage,
  },
  {
    path: '/group/',
    component: GroupPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
