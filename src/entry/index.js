import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../component/Index';
import store from '../vuex/store';

require('../less/index.less');

Vue.use(VueRouter);

const Com = Vue.extend(Index);

new Com({
  store
}).$mount('#app');
