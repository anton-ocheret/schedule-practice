const express = require('express');
const environment = require('../config/environment');

const docsRoutes = require('./docs-routes');
const authRoutes = require('./auth-routes');
const usersRoutes = require('./users-routes');

const router = express.Router();

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    routes: docsRoutes,
  },
];

const appRoutes = [
  {
    path: '/auth',
    routes: authRoutes,
  },
  {
    path: '/users',
    routes: usersRoutes,
  },
];

appRoutes.forEach((route) => {
  router.use(route.path, route.routes);
});

if (environment.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.routes);
  });
}

module.exports = router;
