<template lang="html">
  <div class="page">
    <div class="container">
      <div class="bar">
        <div class="search">
          <input type="text" placeholder="search..." v-model="search">
        </div>
        <a href="javascript:;" @click="addUser">Add</a>
        <a href="javascript:;" @click="shuffleUser">洗牌</a>
      </div>
      <transition-group tag="ul" name="list" class="users">
        <li v-for="(user, index) in users" :key="user.no">
          <em>
            {{user.no}}
          </em>
          <span>
            {{user.name}}
          </span>
          <a href="javascript:;" @click="deleteUser(user, index)">Delete</a>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {
      no: 0,
      search: '',
      users: []
    }
  },
  methods: {
    addUser() {
      this.users.unshift({
        no: this.no,
        name: Math.round(Math.random() * 1000000)
      });
      this.no ++;
    },
    deleteUser(user, index) {
      this.users.splice(index, 1);
    },
    shuffleUser() {
      this.users = _.shuffle(this.users)
    }
  },
  mounted() {
    console.log('home ...')
  }
}
</script>

<style lang="less" scoped>
.page {
  padding: 50px;
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

  .search {
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
      width: 100px;
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
