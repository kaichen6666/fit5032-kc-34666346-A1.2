<template>
  <div class="user-home">
    <h1>User Homepage</h1>
    <p>This is the user's functional area.</p>
    <button class="btn btn-secondary mb-4" @click="$emit('logout')">Logout</button>

    <!-- 星级评分表单 -->
    <div class="review-form mb-4">
      <h3>Submit Your Review</h3>
      <form @submit.prevent="submitReview">
        <label>Username:</label>
        <input v-model="username" required class="form-control" />

        <label class="mt-2">Rating:</label>
        <div class="stars">
          <span
            v-for="n in 5"
            :key="n"
            class="star"
            :class="{ filled: n <= score }"
            @click="score = n"
            >★</span
          >
        </div>

        <label class="mt-2">Comment:</label>
        <textarea v-model="comment" class="form-control"></textarea>

        <button type="submit" class="btn btn-primary mt-2">Submit</button>
      </form>
    </div>

    <!-- 聚合评分显示 -->
    <div v-if="reviews.length" class="review-summary">
      <h3>Average Rating: {{ averageScore.toFixed(1) }}/5</h3>
      <ul class="list-group mt-2">
        <li v-for="(r, index) in reviews" :key="index" class="list-group-item">
          <strong>{{ r.username }}</strong> rated <strong>{{ r.score }}</strong> ★<br />
          Comment: {{ r.comment }}<br />
          <small>{{ r.date }}</small>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 表单数据
const username = ref('')
const score = ref(0)
const comment = ref('')

// 评论列表
const reviews = ref([])

// 提交评论
const submitReview = () => {
  if (!score.value) {
    alert('Please select a rating!')
    return
  }
  reviews.value.push({
    username: username.value,
    score: score.value,
    comment: comment.value,
    date: new Date().toLocaleString(),
  })
  username.value = ''
  score.value = 0
  comment.value = ''
}

// 聚合平均分
const averageScore = computed(() => {
  if (!reviews.value.length) return 0
  return reviews.value.reduce((sum, r) => sum + r.score, 0) / reviews.value.length
})
</script>

<style scoped>
.user-home {
  max-width: 600px;
  margin: 0 auto;
}

.stars {
  font-size: 24px;
  cursor: pointer;
}

.star {
  color: #ccc;
  transition: color 0.2s;
}

.star.filled {
  color: #f5b301;
}

.review-form label {
  font-weight: 600;
}

.review-form textarea {
  min-height: 60px;
}

.list-group-item {
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}
</style>
