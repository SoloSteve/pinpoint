import NavigationPage from '../pages/navigation.vue';
import NotFoundPage from '../pages/404.vue';
import GroupPage from '../pages/group';
import SettingsPage from '../pages/settings';

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
    path: '/settings/',
    component: SettingsPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
