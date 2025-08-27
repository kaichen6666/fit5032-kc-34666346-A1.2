<template>
  <div>
    <!-- Navigation bar, button in the upper right corner -->
    <div class="d-flex justify-content-end mb-4">
      <button class="btn btn-outline-primary me-2" @click="$emit('go-login')">Login</button>
      <button class="btn btn-outline-secondary" @click="$emit('go-register')">Register</button>
    </div>

    <!-- Main content -->
    <div class="text-center">
      <h1>Public health through nutrition education</h1>
      <!-- Homepage content -->
    </div>
  </div>
</template>
