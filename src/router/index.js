import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout.vue";


Vue.use(VueRouter);


export const constantRoutes = [
  // 首页
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [{
        path: "/",
        name: "home",
        component: () => import('@/components/Home/Index'),
        meta: {
          title: '首页'
        },
      },
      {
        path: "/blog",
        name: "blog",
        component: () => import('@/components/Blog/Index'),
        meta: {
          title: '博客'
        },
      },
      {
        path: "/content",
        name: "content",
        component: () => import('@/components/Blog/Content'),
        meta: {
          title: '文章'
        },
      },
      {
        path: "/user",
        name: "user",
        component: () => import('@/components/User/Index'),
        meta: {
          title: '个人中心'
        },
        children: [{
          path: "/user/profile",
          name: "profile",
          component: () => import('@/components/User/Profile'),
          meta: {
            title: '个人资料'
          },
        }, ]
      },
    ]
  },
]

//export default router;
const createRouter = () => new VueRouter({
  mode: 'history', // require service support
  //scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router