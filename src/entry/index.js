import Vue from 'vue';
import Index from '../component/index';

require('../less/a.less');

const Comp = Vue.extend(Index);
new Comp({}).$mount('#app');
