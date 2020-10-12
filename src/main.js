import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import { firestorePlugin } from 'vuefire'

Vue.config.productionTip = false

Vue.use(firestorePlugin);

router.beforeEach((to, from, next) => {
  if (to.name === "login" && store.state.user.email!='') {
    // Redirect user to homepage
    return next({path: '/usuarios'})
  }
  // Let the user pass
  return next()
})

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
