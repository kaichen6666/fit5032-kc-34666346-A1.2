<template>
  <div class="review">
    <h3>Rate {{ target }}</h3>

    <!-- Rating Form -->
    <div class="review-form mb-4">
      <label>Rating:</label>
      <select v-model="rating">
        <option value="">Select rating</option>
        <option v-for="n in 5" :key="n" :value="n">{{ n }} ⭐</option>
      </select>

      <label class="mt-2">Comment:</label>
      <input type="text" v-model="comment" placeholder="Share your thoughts..." maxlength="200" />

      <button class="btn btn-primary mt-2" @click="submitReview" :disabled="!rating">
        Submit Review
      </button>
    </div>

    <!-- Rating Summary -->
    <div v-if="targetReviews.length" class="review-summary mt-4">
      <div class="rating-overview">
        <h4>Reviews for {{ target }}</h4>

        <!-- Aggregate score -->
        <div class="aggregate-rating">
          <div class="rating-score">
            <span class="avg-rating">{{ avgRating.toFixed(1) }}</span>
            <span class="rating-stars">{{ getStarDisplay(avgRating) }}</span>
          </div>
          <div class="rating-count">
            Based on {{ totalReviews }} review{{ totalReviews !== 1 ? 's' : '' }}
          </div>
        </div>

        <!-- Rating distribution -->
        <div class="rating-distribution">
          <div v-for="star in 5" :key="star" class="rating-bar">
            <span class="star-label">{{ star }}⭐</span>
            <div class="bar-container">
              <div class="bar-fill" :style="{ width: getRatingPercentage(star) + '%' }"></div>
            </div>
            <span class="count">{{ getRatingCount(star) }}</span>
          </div>
        </div>
      </div>

      <!-- Comment list -->
      <div class="reviews-list">
        <h5>Individual Reviews:</h5>
        <ul class="list-group mt-2">
          <li v-for="(r, index) in sortedReviews" :key="index" class="list-group-item">
            <div class="review-header">
              <strong>{{ r.user }}</strong>
              <span class="rating-display">{{ getStarDisplay(r.rating) }} ({{ r.rating }}/5)</span>
            </div>
            <p class="review-comment">{{ r.comment || 'No comment provided' }}</p>
            <small class="review-date">{{ r.date }}</small>
          </li>
        </ul>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="no-reviews">
      <p>No reviews yet. Be the first to review {{ target }}!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  target: {
    type: String,
    required: true,
  },
})

//
const reviews = ref([])

const rating = ref('')
const comment = ref('')

const submitReview = () => {
  if (!rating.value) {
    alert('Please select a rating!')
    return
  }

  reviews.value.push({
    user: 'CurrentUser', //
    target: props.target,
    rating: parseInt(rating.value),
    comment: comment.value.trim(),
    date: new Date().toLocaleString(),
    timestamp: Date.now(), //
  })

  // Reset Form
  rating.value = ''
  comment.value = ''
}

// Computed Properties - Aggregate Scoring Functions
const targetReviews = computed(() => reviews.value.filter((r) => r.target === props.target))

const totalReviews = computed(() => targetReviews.value.length)

const avgRating = computed(() => {
  if (!targetReviews.value.length) return 0
  return targetReviews.value.reduce((sum, r) => sum + r.rating, 0) / targetReviews.value.length
})

const sortedReviews = computed(() =>
  [...targetReviews.value].sort((a, b) => b.timestamp - a.timestamp),
)

//
const getStarDisplay = (rating) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  return (
    '⭐'.repeat(fullStars) +
    (hasHalfStar ? '✨' : '') +
    '☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0))
  )
}

const getRatingCount = (star) => {
  return targetReviews.value.filter((r) => r.rating === star).length
}

const getRatingPercentage = (star) => {
  if (!totalReviews.value) return 0
  return (getRatingCount(star) / totalReviews.value) * 100
}
</script>

<style scoped>
.review {
  max-width: 600px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.rating-overview {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.aggregate-rating {
  text-align: center;
  margin-bottom: 20px;
}

.rating-score {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 5px;
}

.avg-rating {
  font-size: 2.5em;
  font-weight: bold;
  color: #007bff;
}

.rating-stars {
  font-size: 1.5em;
}

.rating-count {
  color: #6c757d;
  font-size: 0.9em;
}

.rating-distribution {
  max-width: 300px;
  margin: 0 auto;
}

.rating-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}

.star-label {
  min-width: 40px;
  font-size: 0.9em;
}

.bar-container {
  flex: 1;
  height: 20px;
  background: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffd700, #ff8c00);
  transition: width 0.3s ease;
}

.count {
  min-width: 30px;
  text-align: right;
  font-size: 0.9em;
  color: #6c757d;
}

.list-group-item {
  margin-bottom: 15px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 15px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.rating-display {
  font-size: 0.9em;
  color: #007bff;
}

.review-comment {
  margin: 10px 0;
  line-height: 1.5;
}

.review-date {
  color: #6c757d;
}

.no-reviews {
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
  font-style: italic;
}
</style>
