const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(express.json())

app.use ( '/api/blogs' ,blogsRouter)

const errorHandler = (error, request, response, next) => {
	return response.status(400).json({ 'error': error.message })
}

app.use ( errorHandler )

module.exports = app
