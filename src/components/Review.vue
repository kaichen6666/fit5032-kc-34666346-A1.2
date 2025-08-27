<template>
  <div class="review">
    <h3>Rate {{ target }}</h3>

    <!-- 评分表单 -->
    <div class="review-form mb-4">
      <label>Rating:</label>
      <select v-model="rating">
        <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
      </select>

      <label class="mt-2">Comment:</label>
      <input type="text" v-model="comment" />

      <button class="btn btn-primary mt-2" @click="submitReview">Submit</button>
    </div>

    <!-- 评论汇总 -->
    <div v-if="targetReviews.length" class="review-summary mt-4">
      <h4>Reviews for {{ target }}</h4>
      <p>Average Rating: {{ avgRating.toFixed(1) }}/5</p>
      <ul class="list-group mt-2">
        <li v-for="(r, index) in targetReviews" :key="index" class="list-group-item">
          <strong>{{ r.user }}</strong> rated <strong>{{ r.rating }}</strong> ★<br />
          Comment: {{ r.comment }}<br />
          <small>{{ r.date }}</small>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  target: String,
})

// 全局评论列表（可从 db.js 或其他状态管理）
const reviews = ref([])

const rating = ref(5)
const comment = ref('')

const submitReview = () => {
  if (!rating.value) {
    alert('Please select a rating!')
    return
  }
  reviews.value.push({
    user: 'CurrentUser', // 可以改成实际登录用户名
    target: props.target,
    rating: rating.value,
    comment: comment.value,
    date: new Date().toLocaleString(),
  })
  rating.value = 5
  comment.value = ''
}

// 计算目标的评论列表和平均分
const targetReviews = computed(() => reviews.value.filter((r) => r.target === props.target))
const avgRating = computed(() => {
  if (!targetReviews.value.length) return 0
  return targetReviews.value.reduce((sum, r) => sum + r.rating, 0) / targetReviews.value.length
})
</script>

<style scoped>
.review {
  max-width: 600px;
  margin: 0 auto;
}

.review-form label {
  display: block;
  font-weight: 600;
  margin-top: 10px;
}

.review-form input,
.review-form select {
  width: 100%;
  margin-top: 5px;
}

.list-group-item {
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}
</style>
