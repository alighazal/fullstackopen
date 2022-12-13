
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')


const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
	  return authorization.substring(7)
	}
	return null
}

blogsRouter.get('/', async (request, response) => {
	let blogs = await Blog.find({}).populate('user')
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

	const token = getTokenFrom(request)
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id)

	const blog = new Blog({ ...request.body, user: user.id  })
	const createdBlog = await blog.save()

	user.blogs = user.blogs.concat(createdBlog._id)
	user.save()

	response.status(201).json(createdBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	const id = String(request.params.id)
	await Blog.findByIdAndRemove(id)
	response.status(204).end()
})


blogsRouter.put('/:id', async (request, response) => {
	const body = request.body
	const id = String(request.params.id)

	const newBlog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0
	}
	const updatedPerson = await Blog.findByIdAndUpdate(id, newBlog,  { new: true, runValidators: true, context: 'query' })
	response.json(updatedPerson)

})


module.exports = blogsRouter
