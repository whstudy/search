export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: 'login',
            access: 'normalRoute',
            deployMode: ['tfs', 'tos'],
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/',
    name: 'main',
    component: './main',
    layout: false,
    hideInMenu: false,
    hideNav: false,
    routes: [
      {
        path: '/search',
        name: 'search',
        component: './main/search',
      },
      {
        path: '/cluster',
        name: 'cluster',
        component: './main/cluster',
      },
    ],
  },
  {
    path: '/',
    redirect: '/search',
  },
  // 404
  {
    component: './404',
    deployMode: ['tfs', 'tos'],
  },
];
