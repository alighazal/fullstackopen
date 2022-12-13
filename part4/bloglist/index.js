require('dotenv').config()

const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')

const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())

app.use ( '/api/blogs' ,blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})