// import { createRouter, createWebHistory } from "vue-router";
// import SideMenu from "../layouts/side-menu/Main.vue";
// import SimpleMenu from "../layouts/simple-menu/Main.vue";
// import TopMenu from "../layouts/top-menu/Main.vue";
// import Page1 from "../views/page-1/Main.vue";
// import Page2 from "../views/page-2/Main.vue";

// const routes = [
//   {
//     path: "/",
//     component: SideMenu,
//     children: [
//       {
//         path: "/",
//         name: "side-menu-page-1",
//         component: Page1,
//       },
//       {
//         path: "page-2",
//         name: "side-menu-page-2",
//         component: Page2,
//       },
//     ],
//   },
//   {
//     path: "/simple-menu",
//     component: SimpleMenu,
//     children: [
//       {
//         path: "page-1",
//         name: "simple-menu-page-1",
//         component: Page1,
//       },
//       {
//         path: "page-2",
//         name: "simple-menu-page-2",
//         component: Page2,
//       },
//     ],
//   },
//   {
//     path: "/top-menu",
//     component: TopMenu,
//     children: [
//       {
//         path: "page-1",
//         name: "top-menu-page-1",
//         component: Page1,
//       },
//       {
//         path: "page-2",
//         name: "top-menu-page-2",
//         component: Page2,
//       },
//     ],
//   },
// ];
import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/register/Main.vue';
import Login from '../views/login/Main.vue';
import ErrorPage from '../views/error-page/Main.vue';
import Chat from '../views/chat/Main.vue';
import Home from '../views/home/Main.vue';

const routes = [
  { path: '/', name: 'register', component: Register },
  { path: '/login', name: 'login', component: Login },
  { path: '/:pathMatch(.*)*', component: ErrorPage },
  { path: '/chat', name: 'chat', component: Chat },
  { path: '/home', name: 'home', component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

export default router;
