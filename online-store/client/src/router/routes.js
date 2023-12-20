const routes = [
  {
    path: "/",
    component: () => import("layouts/EmptyLayout.vue"),
    children: [
      { path: "", name: "home", component: () => import("pages/HomePage.vue") },
      {
        path: "login",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "reg",
        name: "reg",
        component: () => import("src/pages/RegPage.vue"),
      },
      {
        path: "main",
        name: "main",
        component: () => import("src/pages/MainPage.vue"),
      },
      {
        path: "book",
        name: "book",
        component: () => import("src/pages/BookInfo.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
