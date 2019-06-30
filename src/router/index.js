import Vue from 'vue'
import Router from 'vue-router'

// common
import PageHome from '../page/PageHome'
import PageNotFound from '../page/PageNotFound'

// for university
import PageUCompany from '../page/university/PageUCompany'
import PageUEvent from '../page/university/PageUEvent'

var routes = [{
    path: '/u-companies',
    name: 'PageUCompany',
    component: PageUCompany
  },
  {
    path: '/u-events',
    name: 'PageUEvent',
    component: PageUEvent
  },
  {
    path: '/',
    name: 'PageHome',
    component: PageHome
  },
  {
    path: '/not-found',
    name: 'PageNotFound',
    component: PageNotFound
  },
  {
    path: '/*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]


// #######################################################
// register Router
Vue.use(Router)
const router = new Router({
  routes: routes
})
export default router;
