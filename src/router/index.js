import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout.vue";


Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Layout",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Layout",
    component: Layout
  },
  {
    path: "/login",
    name: "Layout",
    component: Layout
  },
  {
    path: "/blog",
    name: "Layout",
    component: Layout
  },
];

const router = new VueRouter({
  mode: 'history', // 去掉url中的#
  routes
});

export default router;