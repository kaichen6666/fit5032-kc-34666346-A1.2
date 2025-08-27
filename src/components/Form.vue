<template>
  <div class="container mt-5">
    <!-- 修改导航按钮位置到右上角 -->
    <div class="row mb-4">
      <div class="col-12 d-flex justify-content-end">
        <button @click="$emit('go-home')" class="btn btn-outline-secondary me-2">
          Return Home
        </button>
        <button @click="$emit('go-login')" class="btn btn-outline-primary">Login</button>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form</h1>
        <form @submit.prevent="submitForm">
          <!-- Right click on inspect to adjust the layout of the page -->
          <!-- Ensure responsiveness for compatibility with various devices -->
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="formData.username"
              @input="() => validateName(false)"
              @blur="() => validateName(true)"
            />
            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="formData.password"
              @input="() => validatePassword(false)"
              @blur="() => validatePassword(true)"
            />
            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="formData.email"
              @input="validateEmail(false)"
              @blur="validateEmail(true)"
            />
            <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
          </div>

          <div class="mb-3">
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="isAustralian"
                v-model="formData.isAustralian"
                @input="() => validateResident(false)"
                @blur="() => validateResident(true)"
              />
              <div v-if="errors.isAustralian" class="text-danger">{{ errors.isAustralian }}</div>
              <label class="form-check-label" for="isAustralian">Australian Resident?</label>
            </div>
          </div>

          <div class="mb-3">
            <label for="gender" class="form-label">Gender</label>
            <select
              class="form-select"
              id="gender"
              v-model="formData.gender"
              @input="() => validateGender(false)"
              @blur="() => validateGender(true)"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              v-model="formData.reason"
              @input="() => validateReason(false)"
              @blur="() => validateReason(true)"
            >
            </textarea>
            <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>

    <div class="row mt-5" v-if="submittedCards.length">
      <div class="d-flex flex-wrap justify-content-start">
        <div
          v-for="(card, index) in submittedCards"
          :key="index"
          class="card m-2"
          style="width: 18rem"
        >
          <div class="card-header">User Information</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Username: {{ card.username }}</li>
            <li class="list-group-item">Password: {{ card.password }}</li>
            <li class="list-group-item">
              Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
            </li>
            <li class="list-group-item">Gender: {{ card.gender }}</li>
            <li class="list-group-item">Reason: {{ card.reason }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Our logic will go here

import { ref } from 'vue'

const formData = ref({
  username: '',
  password: '',
  email: '',
  isAustralian: false,
  reason: '',
  gender: '',
})

const errors = ref({
  username: null,
  password: null,
  email: null,
  isAustralian: null,
  reason: null,
  gender: null,
})
const submittedCards = ref([])

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    email: '',
    isAustralian: false,
    reason: '',
    gender: '',
  }
  // 清空错误信息
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = null
  })
}

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateEmail(true)
  validateResident(true)
  validateGender(true)

  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.email &&
    !errors.value.isAustralian &&
    !errors.value.gender
  ) {
    submittedCards.value.push({
      ...formData.value,
    })
    clearForm()
  }
}

//1.Username length must be ≥ 3
const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    //alert('length must bigger than 3')
    errors.value.username = 'Name must be at least 3 chars'
  } else {
    //alert('success')
    errors.value.username = null
  }
}

//2.Length ≥ 8 characters，Contain at least 1 uppercase letter，Contain at least 1 lowercase letter，Contain at least 1 number，Contain at least 1 special character
const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = `Password must contains at least one uppercase letter`
  } else if (!hasLowercase) {
    if (blur) errors.value.password = `Password must contains at least one lowercase letter`
  } else if (!hasNumber) {
    if (blur) errors.value.password = `Password must contains at least one number`
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = `Password must contains at least one special letter`
  } else {
    errors.value.password = null
  }
}

const validateEmail = (blur) => {
  const email = formData.value.email
  // 简单正则验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) {
    if (blur) errors.value.email = 'Email is required'
  } else if (!emailRegex.test(email)) {
    if (blur) errors.value.email = 'Invalid email format'
  } else {
    errors.value.email = null
  }
}

const validateResident = (blur) => {
  if (!formData.value.isAustralian) {
    if (blur) errors.value.isAustralian = `You must be an Australian`
  } else {
    errors.value.isAustralian = null
  }
}

const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = `You must select a gender`
  } else {
    errors.value.gender = null
  }
}

const validateReason = (blur) => {
  const text = formData.value.reason
  if (!text) {
    if (blur) errors.value.reason = `Reason is required`
  } else {
    errors.value.reason = null
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
