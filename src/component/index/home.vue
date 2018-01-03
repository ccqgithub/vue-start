<template lang="html">
  <div class="page">
    <transition name="fade">
      <div class="loading" v-if="isLoading">
        <span>loading...</span>
      </div>
    </transition>

    <div class="container">
      <div class="bar">
        <div class="filter">
          <input type="text" placeholder="filter..." v-model="filter">
        </div>
        <a href="javascript:;" @click="addNewUser">Add</a>
        <a href="javascript:;" @click="userShuffle">洗牌</a>
      </div>
      <transition-group tag="ul" name="list" class="users" appear>
        <li v-for="(user, index) in filterUsers" :key="user.id">
          <em>
            {{user.id}}
          </em>
          <span>
            {{user.name}}
          </span>
          <a href="javascript:;" @click="userDelete(user.id)">Delete</a>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import userTypes from '../../vuex/types/user';

export default {
  data() {
    return {
      filter: '',
      isLoading: false,
    }
  },
  computed: {
    filterUsers() {
      if (this.filter.trim() == '') return this.userList;
      return this.userList.filter(user => {
        return user.name.indexOf(this.filter.trim()) != -1;
      })
    },
    ...mapGetters({
      userList: userTypes.USER_LIST
    })
  },
  methods: {
    ...mapActions({
      userAdd: userTypes.USER_ADD,
      userDelete: userTypes.USER_DELETE
    }),
    // 跳过action，直接使用mutation
    ...mapMutations({
      userShuffle:userTypes.USER_SHUFFLE
    }),
    addNewUser() {
      let str = 'abcdefghijklmnopqrstuvwxyz012345678ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let id = Math.round(Math.random() * 1000000000)
      let name = new Array(8).fill(1).map((item, index) => {
        return str[Math.round(Math.random() * (str.length - 1))];
      }).join('');

      this.isLoading = true
      this.userAdd({id, name})
        .then(data => {
          this.isLoading = false
        })
    },
  },
  mounted() {
    console.log('home ...')
  }
}
</script>

<style lang="less" scoped>
.page {
  padding: 50px;
  position: relative;
}

.loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background: rgba(0, 0, 0, .5);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

// transition
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

.container {
  width: 600px;
  background-color: #fff;
  margin: 0 auto;
  min-height: 400px;
}

.bar {
  padding: 20px;
  display: flex;
  justify-content: center;

  .filter {
    flex: 1;
  }

  input {
    width: 100%;
    line-height: 30px;
    padding: 10px;
  }

  a {
    background: rgb(22, 123, 144);
    text-align: center;
    line-height: 50px;
    width: 80px;
    margin-left: 10px;
  }
}

.users {
  position: relative;
  list-style: none;
  margin: 20px 20px;
  padding: 0;

  // transition:
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  .list-move {
    transition: transform 1s;
  }
  .list-leave-active {
    position: absolute;
    width: 100%;
  }

  li {
    margin: 0;
    padding: 5px;
    border-bottom: 1px solid #ddd;
    display: flex;
    line-height: 50px;

    em {
      width: 150px;
    }

    span {
      flex: 1;
    }

    a {
      background: rgb(236, 153, 29);
      text-align: center;
      line-height: 50px;
      width: 80px;
    }
  }
}
</style>
