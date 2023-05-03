import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Filter from '@/components/Filter'
import ShowBook from '@/components/ShowBook'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/filter',
      name: 'Filter',
      component: Filter
    },
    {
      path: '/showBook',
      name: 'showBook',
      component: ShowBook
    }
  ]
})
