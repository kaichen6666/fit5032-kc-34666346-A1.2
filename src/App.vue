<script setup>
import { ref } from 'vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Form from './components/Form.vue'

// 当前显示的页面：'home' | 'login' | 'register'

const currentPage = ref('home')

// 切换页面函数
const goTo = (page) => {
  currentPage.value = page
}
</script>

<template>
  <main class="container mt-5">
    <!-- 首页 -->
    <Home v-if="currentPage === 'home'" @go-login="goTo('login')" @go-register="goTo('register')" />

    <!-- 登录页 -->
    <Login
      v-else-if="currentPage === 'login'"
      @go-home="goTo('home')"
      @go-register="goTo('register')"
    />

    <!-- 注册页 -->
    <Form
      v-else-if="currentPage === 'register'"
      @go-home="goTo('home')"
      @go-login="goTo('login')"
    />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
