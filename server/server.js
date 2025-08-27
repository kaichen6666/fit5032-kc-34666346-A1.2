// server/server.js
import express from 'express'
import fs from 'fs'
import path from 'path'
import bodyParser from 'body-parser'

const app = express()
const PORT = 3000

app.use(bodyParser.json())

const dbPath = path.resolve('./server/users.json')

// 获取用户列表
app.get('/users', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath))
  res.json(data.normalUsers)
})

// 注册新用户
app.post('/register', (req, res) => {
  const { username, password } = req.body
  const data = JSON.parse(fs.readFileSync(dbPath))

  if (data.normalUsers.find((u) => u.username === username)) {
    return res.status(400).json({ message: 'Username exists' })
  }

  data.normalUsers.push({ username, password })
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
  res.json({ message: 'User registered successfully' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
