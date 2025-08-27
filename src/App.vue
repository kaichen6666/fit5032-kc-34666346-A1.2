<script setup>
import { ref } from 'vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Form from './components/Form.vue'
import UserHome from './components/UserHome.vue'
import AdminHome from './components/AdminHome.vue'

// 当前显示的页面：'home' | 'login' | 'register' | 'userHome' | 'adminHome'
const currentPage = ref('home')
// 当前选择的登录类型：'user' | 'admin'
const loginType = ref(null)

// 切换页面函数
const goTo = (page, type = null) => {
  currentPage.value = page
  if (page === 'login') loginType.value = type
}

// 登录成功后回到主页（根据身份显示不同内容）
const loginSuccess = (payload) => {
  // payload = { username: 'xxx', type: 'user' | 'admin' }
  loginType.value = payload.type
  currentPage.value = payload.type === 'admin' ? 'adminHome' : 'userHome'
}
</script>

<template>
  <main class="container mt-5">
    <!-- 首页 -->
    <Home
      v-if="currentPage === 'home'"
      @go-login="goTo('login', $event)"
      @go-register="goTo('register')"
    />

    <!-- 登录页面 -->
    <Login
      v-else-if="currentPage === 'login'"
      :loginType="loginType"
      @go-home="goTo('home')"
      @go-register="goTo('register')"
      @login-success="loginSuccess"
    />

    <!-- 注册页面 -->
    <Form
      v-else-if="currentPage === 'register'"
      @go-home="goTo('home')"
      @go-login="goTo('login')"
    />

    <!-- 用户主页 -->
    <UserHome v-else-if="currentPage === 'userHome'" @logout="goTo('home')" />

    <!-- 管理员主页 -->
    <AdminHome v-else-if="currentPage === 'adminHome'" @logout="goTo('home')" />
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
