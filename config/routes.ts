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
    layout: false,
    hideInMenu: false,
    hideNav: false,
    routes: [
      {
        path: '/',
        component: './main',
        access: 'normalRoute',
        deployMode: ['tfs', 'tos'],
        exact: true,
      },
    ],
  },
  {
    path: 'welcome',
    component: './Welcome',
    deployMode: ['tfs', 'tos'],
    hideInMenu: true,
  },
  // 404
  {
    component: './404',
    deployMode: ['tfs', 'tos'],
  },
];
