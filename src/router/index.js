import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView"),
    children: [
      {
        path: '/article/:id',
        name: 'article',
        component: ()=>import("@/views/article")
      },
      {
        path: '/my',
        name: 'my',
        component: () => import("@/views/proflie")
      },
      {
        path: `/category/:title/:id`,
        name: 'category',
        component: () => import("@/views/category")
      },
      {
        path: `/tag/:title/:id`,
        name: 'tag',
        component: () => import("@/views/tag") 
      },{
        path: '/archive',
        name: 'archive',
        component: () => import("@/views/archive")
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0;
  document.documentElement.srcollTop = 0;

  window.scrollTo(0, 0);
  next();
});

export default router;
