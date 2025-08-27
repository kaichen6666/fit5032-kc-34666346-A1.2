<template>
  <div class="user-home">
    <h1>User Homepage</h1>
    <p>This is the user's functional area.</p>
    <button class="btn btn-secondary mb-4" @click="$emit('logout')">Logout</button>

    <!-- 使用 Review 组件 -->
    <Review target="Product A" />
    <Review target="Product B" />
  </div>
</template>

<script setup>
import Review from './Review.vue'
</script>

<style scoped>
.user-home {
  max-width: 600px;
  margin: 0 auto;
}
</style>
