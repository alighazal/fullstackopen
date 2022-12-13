const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


app.use(cors())
app.use(express.json())

app.use ( '/api/blogs', blogsRouter)
app.use ( '/api/users', usersRouter)
app.use ( '/api/login', loginRouter)

const errorHandler = (error, request, response, next) => {
	return response.status(400).json({ 'error': error.message })
}

app.use ( errorHandler )

module.exports = app
