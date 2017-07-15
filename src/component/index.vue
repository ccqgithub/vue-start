<template lang="html">
<div id="app" class="app">
  <nav class="nav">
    <span class="user">
      user: {{loginUser.name}}
    </span>
    <ul>
      <li>
        <router-link :to="{ name: 'home'}" exact>Home2</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'user'}" exact>User</router-link>
      </li>
    </ul>
  </nav>
  <transition name="router-transition" mode="out-in" class="router">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import VueRouter from 'vue-router';
import routes from '../routes';
import mainTypes from '../vuex/types/main';

const router = new VueRouter({
  routes
});

export default {
  router,
  mounted() {
    // console.log(this.$store)
  },
  computed: {
    ...mapGetters({
      loginUser: mainTypes.LOGIN_USER
    })
  }
}
</script>

<style lang="less" scoped>
.app {
  overflow-x: hidden;
}

.router-transition-enter {
  transform: translateX(1000px);
  // opacity: 0;
}
.router-transition-enter-active {
  transition: all .3s ease;
}
.router-transition-leave-active {
  transition: all .3s ease;
  transform: translateX(-1000px);
}

.nav {
  height: 50px;
  background: rgba(0, 0, 0, .9);
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: center;

  .user {
    color: #ddd;
    line-height: 50px;
  }

  ul {
    margin: 0;
    display: inline-flex;
    list-style: none;
  }

  li {
    padding: 0 20px;
    background: rgba(255, 255, 255, .2);
    border-right: 1px solid #ddd;
    &:first-child {
      border-left: 1px solid #ddd;
    }
  }

  a {
    display: inline-block;
    line-height: 50px;
    color: #fff;

    &.router-link-active {
      color: red;
    }
  }
}
</style>
