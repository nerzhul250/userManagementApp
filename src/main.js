import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import VueSimpleAlert from "vue-simple-alert";
import { firestorePlugin } from 'vuefire'

Vue.config.productionTip = false

Vue.use(firestorePlugin);
Vue.use(VueSimpleAlert);

router.beforeEach((to, from, next) => {
  if (to.name === "login" && store.state.user.email!='') {
    // Redirect user to homepage
    return next({path: '/usuarios'})
  }
  console.log(store.state.user.email)
  if(store.state.user.email==='' && to.name!='login'){
    return next({path: '/'})
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
