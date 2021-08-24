import { createWebHistory, createRouter } from "vue-router";
import Homepage from "@/views/Homepage.vue";
import Login from "@/views/Login.vue";
import Wall from "@/views/Wall.vue";
import Profil from "@/views/Profil.vue"
import store from "@/store/index.js"

const authGuard = (to, from, next) => {                       // navigation guards 
  if (store.getters.isAuthenticated) {
    next();
  } else {
    next("/login")
  }
};

const routes = [
  {
    name: 'homepage',
    path: '/', 
    component: Homepage,
  },
  { 
    name: 'login',
    path: '/login', 
    component: Login,
  },
  {
    name: "wall",
    path: "/wall",
    component: Wall,
    beforeEnter: authGuard
  },
  {
    name: "profil",
    path:"/profil",
    component: Profil,
    beforeEnter: authGuard
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;