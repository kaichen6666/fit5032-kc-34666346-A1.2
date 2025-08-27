<template>
  <div class="login-form">
    <!-- 导航按钮 -->
    <div class="d-flex justify-content-end mb-4">
      <button @click="$emit('go-home')" class="btn btn-outline-secondary me-2">Return Home</button>
      <button @click="$emit('go-register')" class="btn btn-outline-info">Register</button>
    </div>

    <!-- 登录标题根据身份 -->
    <h2>{{ loginType === 'admin' ? 'Admin Login' : 'User login' }}</h2>

    <form @submit.prevent="login">
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input type="text" v-model="username" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" v-model="password" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { adminUsers } from '../db.js'

const props = defineProps({
  loginType: String, // 'user' 或 'admin'
})

const emit = defineEmits(['login-success', 'go-home', 'go-register'])

const username = ref('')
const password = ref('')

const login = async () => {
  if (props.loginType === 'admin') {
    // 管理员用本地数组验证
    const user = adminUsers.find(
      (u) => u.username === username.value && u.password === password.value,
    )
    if (!user) return alert('Admin login failed')
    emit('login-success', { username: username.value, type: 'admin' })
  } else {
    // 普通用户通过后端验证
    try {
      const res = await fetch('http://localhost:3000/users')
      const users = await res.json()
      const user = users.find((u) => u.username === username.value && u.password === password.value)
      if (!user) return alert('User login failed')
      emit('login-success', { username: username.value, type: 'user' })
    } catch (err) {
      console.error(err)
      alert('Login failed due to server error')
    }
  }
}
</script>
