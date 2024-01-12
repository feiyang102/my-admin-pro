import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";

// const routes: Array<RouteRecordRaw> = [
//     {
//         path: "/",
//         name: "Home",
//         component: () => import("@/views/home/index.vue"),
//         meta: {},
//         children: [],
//     },
// ];

// 功能路由
export const aboutRouter = {
  path: "/about",
  name: "about",
  component: () => import("@/views/about/index.vue"),
  meta: {},
  children: [],
} as RouteRecordRaw;

// 业务路由
const modules: Record<string, any> = import.meta.glob("./modules/*.ts", {
  eager: true,
});
// 路由配置
const routes: Array<RouteRecordRaw> = [];
Object.keys(modules).forEach((key) => {
  const module = modules[key].default;
  routes.push(module);
});
routes.push(aboutRouter);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 不需要登录的页面
const noStatusPage = ["/login", "/about"];
router.beforeEach(async (_to, _from, next) => {
  const token = sessionStorage.getItem("userInfo");
  const userIsLogin = token ? true : false;
  if (userIsLogin || noStatusPage.includes(_to.path)) {
    next();
  } else {
    next("/login");
  }
  //TODO 加载进度条未调试
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
