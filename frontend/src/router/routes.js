import { routeNames } from 'src/constants';

const Login = () => import('src/pages/login.vue');
const Register = () => import('src/pages/register.vue');
const Schedule = () => import('src/pages/schedule.vue');

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/schedule-form.vue'),
      },
      {
        path: '/login',
        name: routeNames.login,
        component: Login,
        meta: {
          isPublic: true,
        },
      },
      {
        path: '/register',
        name: routeNames.register,
        component: Register,
        meta: {
          isPublic: true,
        },
      },
      {
        path: '/schedule',
        name: routeNames.schedule,
        component: Schedule,
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
