// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import UserDashboard from '../views/UserDashboard.vue';
import PostDetail from '../views/PostDetail.vue';
import AdminPanel from '../views/AdminPanel.vue';
import CreatePost from '../views/CreatePost.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true } // 只有认证用户可访问
  },
  {
    path: '/posts/:postId',
    name: 'PostDetail',
    component: PostDetail,
    props: true
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel,
    meta: { requiresAdmin: true } // 只有管理员可访问
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
    meta: { requiresAuth: true } // 只有认证用户可发帖
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// 路由守卫
// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.meta.requiresAuth;
//   const requiresAdmin = to.meta.requiresAdmin;
//   const user = JSON.parse(localStorage.getItem('user')); // 假设登录状态保存在localStorage

//   if (requiresAuth && !user) {
//     next({ name: 'Login' });
//   } else if (requiresAdmin && (!user || !user.isAdmin)) {
//     next({ name: 'Home' });
//   } else {
//     next();
//   }
// });

export default router;
