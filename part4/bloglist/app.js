const express = require('express')
require('express-async-errors')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const middleware = require('./middleware')

const blogsRouter = require('./controllers/blogs' )
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing')
	app.use('/api/testing', testingRouter)
}


app.use(cors())
app.use(express.json())

// eslint-disable-next-line no-unused-vars
morgan.token('body', (req, res) => {
	if (req.method === 'POST')
		return JSON.stringify(req.body)
	else
		return ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use ( '/api/blogs' , blogsRouter)
app.use ( '/api/users',  usersRouter)
app.use ( '/api/login', loginRouter)

const errorHandler = (error, request, response, next) => {
	if ( error.name  === 'JsonWebTokenError' ){
		return response.status(401).json({ 'error': error.message })
	}
	else{
		return response.status(400).json({ 'error': error.message })
	}

}
app.use ( errorHandler )

module.exports = app
