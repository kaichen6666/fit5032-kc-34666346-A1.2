<template>
  <div class="user-home">
    <div class="header">
      <h1>User Homepage</h1>
      <button class="btn btn-secondary" @click="$emit('logout')">Logout</button>
    </div>

    <p>This is the user's functional area.</p>

    <!--  Review  -->
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

/* The header uses flex layout, with the title on the left and the button on the right */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
