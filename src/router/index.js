import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import Registro from '../views/Registro.vue'
import Edicion from '../views/Edicion.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      privado: true
    },
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registro',
    name: 'registro',
    component: Registro
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      privado: true
    },
    component: Admin
  },
  {
    path: '/edicion/:id',
    props: true,
    name: 'Edicion',
    meta: {
      privado: true
    },
    component: Edicion
  },
  {
    path: '/*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '*',
    name: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const user = firebase.auth().currentUser
  console.log(user)
  console.log(to)
  const privateRute = to.meta.privado

  if (privateRute && !user) {
    next('/login')
  } else if (privateRute === undefined && user) {
    next('/')
  } else {
    next()
  }
})

export default router
