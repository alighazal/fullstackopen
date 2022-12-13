
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
	let blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body)
	const createdBlog = await blog.save()
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
