const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
	{
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7
	},
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5
	},
	{
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12
	},
	{
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10
	},
	{
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0
	},
	{
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2
	}
]

const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})
	const blogObjects = initialBlogs.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
}, 100000 )


test('the right number of blogs is returned', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(initialBlogs.length)
}, 100000)


test('blogs have the property id', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body[0].id).toBeDefined()
}, 100000)


test('we can create a new blog post', async () => {
	const newBlog = {
		title: 'tests tests tests',
		author: 'Messi',
		url: 'http://blog.cleancoder.com/',
		likes: 122222
	}
	await api.post('/api/blogs').send(newBlog)

	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(initialBlogs.length  + 1)


}, 100000)

test('if likes prop is missing, it will default to zero', async () => {
	const newBlog = {
		title: 'tests tests tests',
		author: 'Messi',
		url: 'http://blog.cleancoder.com/'
	}
	const response = await api.post('/api/blogs').send(newBlog)
	expect(response.body.id).toBeDefined()
	expect(response.body.likes).toBe(0)

}, 100000)


test('if url prop is missing, reqest will fail', async () => {
	const newBlog = {
		title: 'tests tests tests',
		author: 'Messi',
	}
	const response = await api.post('/api/blogs').send(newBlog).expect(400)
	console.log( response.body )

}, 100000)

test('if author prop is missing, reqest will fail', async () => {
	const newBlog = {
		author: 'Messi',
		url: 'http://blog.cleancoder.com/'
	}
	const response = await api.post('/api/blogs').send(newBlog).expect(400)
	console.log( response.body )
}, 100000)

test('can delete blog post', async () => {

	const newBlog = {
		title: 'tests tests tests',
		author: 'Messi',
		url: 'http://blog.cleancoder.com/',
		likes: 45
	}
	const response = await api.post('/api/blogs').send(newBlog)
	const allBlogsResponseBeforeDelete = await api.get('/api/blogs')
	expect(allBlogsResponseBeforeDelete.body).toHaveLength(initialBlogs.length + 1)

	await api.delete(`/api/blogs/${response.body.id}`)
	const allBlogsResponseAfterDelete = await api.get('/api/blogs')
	expect(allBlogsResponseAfterDelete.body).toHaveLength(initialBlogs.length)
}, 100000)


test('can update blog', async () => {

	const newBlog = {
		title: 'tests tests tests',
		author: 'Messi',
		url: 'http://blog.cleancoder.com/',
		likes: 45
	}
	const responseBefereUpdate = await api.post('/api/blogs').send(newBlog)
	const updatedBlog = {
		title: 'tests tests tests',
		author: 'Ronaldo',
		url: 'http://blog.cleancoder.com/',
		likes: 45
	}
	const responseAfterUpdateUpdate = await api.put(`/api/blogs/${responseBefereUpdate.body.id}`).send(updatedBlog)
	expect(responseAfterUpdateUpdate.body.author).toBe(updatedBlog.author)

}, 100000)

afterAll(() => {
	mongoose.connection.close()
})