import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/cate',
    name: 'Category',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Category.vue')
  },
 
  {
    path: '/nopage',
    name: 'Nopage',
    component: () => import(/* webpackChunkName: "about" */ '../views/Nopage.vue')
  },
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'*',
    redirect:'/nopage'
  }
]

const router = new VueRouter({
  routes
})

export default router
