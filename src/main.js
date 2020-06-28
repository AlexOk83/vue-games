import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import App from './App.vue'
import router from './routes'

Vue.use(VueRouter);

new Vue({
    el: '#app',
    store,
    render: h => h(App),
    router
});
