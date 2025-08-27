<template>
  <div class="login-form">
    <!-- 导航按钮放在右上角 -->
    <div class="d-flex justify-content-end mb-4">
      <button @click="$emit('go-home')" class="btn btn-outline-secondary me-2">Return Home</button>
      <button @click="$emit('go-register')" class="btn btn-outline-info">Register</button>
    </div>

    <h2>Login</h2>

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

const username = ref('')
const password = ref('')

const login = () => {
  alert(`Login attempt: ${username.value}`)
}
</script>
