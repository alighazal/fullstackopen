
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', async (request, response) => {
	let blogs = await Blog.find({}).populate('user')
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {


	const user = request.user
	const blog = new Blog({ ...request.body, user: user.id  })
	const createdBlog = await blog.save()

	user.blogs = user.blogs.concat(createdBlog._id)
	user.save()

	response.status(201).json(createdBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	const id = String(request.params.id)

	const user = request.user
	const targetBlog = await Blog.findById( id )

	if ( targetBlog.user.toString() === user.id.toString() ){
		await Blog.findByIdAndRemove(id)
		response.status(204).end()
	}else{
		response.status(400).json( { 'msg': 'can\'t delete post' } )
	}
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
