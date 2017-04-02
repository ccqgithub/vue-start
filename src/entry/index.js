import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../component/Index';

require('../less/index.less');

Vue.use(VueRouter);

const Com = Vue.extend(Index);

new Com({}).$mount('#app');
