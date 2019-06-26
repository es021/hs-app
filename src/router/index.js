import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '../page/PageHome'
import PageNotFound from '../page/PageNotFound'

// register Router
Vue.use(Router)

const router = new Router({
  routes: [{
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
})

export default router;
