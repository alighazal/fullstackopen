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

const newUser = {
	'username': 'ziziooo',
	'name': 'koko',
	'password': 'toto'
}

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
	await Blog.deleteMany({})
	await User.deleteMany({})

	const user = await api.post('/api/users').send( newUser )

	const blogObjects = initialBlogs.map(blog => new Blog({ ...blog, user: user.body.id }))
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

	const loginInfo = await api.post('/api/login').send({ 'username': newUser.username, 'password': newUser.password })

	await api.post('/api/blogs').send(newBlog).set({ 'Authorization': `Bearer ${loginInfo.body.token}` })

	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(initialBlogs.length  + 1)


}, 100000)

test('we can\'t create a new blog post if not authorized', async () => {
	const newBlog = {
		title: 'tests tests tests',
		author: 'Messi',
		url: 'http://blog.cleancoder.com/',
		likes: 122222
	}

	await api.post('/api/blogs').send(newBlog).expect(401)

}, 100000)

test('if likes prop is missing, it will default to zero', async () => {
	const newBlog = {
		title: 'tests tests tests',
		author: 'Messi',
		url: 'http://blog.cleancoder.com/'
	}

	const loginInfo = await api.post('/api/login').send({ 'username': newUser.username, 'password': newUser.password })
	const response = await api.post('/api/blogs').send(newBlog).set({ 'Authorization': `Bearer ${loginInfo.body.token}` })
	expect(response.body.id).toBeDefined()
	expect(response.body.likes).toBe(0)

}, 100000)


test('if url prop is missing, reqest will fail', async () => {
	const newBlog = {
		title: 'tests tests tests',
		author: 'Messi',
	}

	const loginInfo = await api.post('/api/login').send({ 'username': newUser.username, 'password': newUser.password })
	const response = await api.post('/api/blogs').send(newBlog).set({ 'Authorization': `Bearer ${loginInfo.body.token}` }).expect(400)

}, 100000)

test('if author prop is missing, reqest will fail', async () => {
	const newBlog = {
		author: 'Messi',
		url: 'http://blog.cleancoder.com/'
	}
	const loginInfo = await api.post('/api/login').send({ 'username': newUser.username, 'password': newUser.password })

	const response = await api.post('/api/blogs').set({ 'Authorization': `Bearer ${loginInfo.body.token}` }).send(newBlog).expect(400)
}, 100000)

test('can delete blog post', async () => {

	const newBlog = {
		title: 'tests tests tests',
		author: 'Messi',
		url: 'http://blog.cleancoder.com/',
		likes: 45
	}

	const loginInfo = await api.post('/api/login').send({ 'username': newUser.username, 'password': newUser.password })
	const response = await api.post('/api/blogs').send(newBlog).set({ 'Authorization': `Bearer ${loginInfo.body.token}` })

	const allBlogsResponseBeforeDelete = await api.get('/api/blogs')
	expect(allBlogsResponseBeforeDelete.body).toHaveLength(initialBlogs.length + 1)

	await api.delete(`/api/blogs/${response.body.id}`).set({ 'Authorization': `Bearer ${loginInfo.body.token}` })
	const allBlogsResponseAfterDelete = await api.get('/api/blogs')
	expect(allBlogsResponseAfterDelete.body).toHaveLength(initialBlogs.length)
}, 100000)


test('can\'t delete blog post if not authorized', async () => {
	const newBlog = {
		title: 'tests tests tests',
		author: 'Messi',
		url: 'http://blog.cleancoder.com/',
		likes: 45
	}
	const loginInfo = await api.post('/api/login').send({ 'username': newUser.username, 'password': newUser.password })
	const response = await api.post('/api/blogs').send(newBlog).set({ 'Authorization': `Bearer ${loginInfo.body.token}` })
	const allBlogsResponseBeforeDelete = await api.get('/api/blogs')
	expect(allBlogsResponseBeforeDelete.body).toHaveLength(initialBlogs.length + 1)
	await api.delete(`/api/blogs/${response.body.id}`).expect(401)
}, 100000)


test('can update blog', async () => {

	const newBlog = {
		title: 'tests tests tests',
		author: 'Messi',
		url: 'http://blog.cleancoder.com/',
		likes: 45
	}

	const loginInfo = await api.post('/api/login').send({ 'username': newUser.username, 'password': newUser.password })


	const responseBefereUpdate = await api.post('/api/blogs').send(newBlog).set({ 'Authorization': `Bearer ${loginInfo.body.token}` })
	const updatedBlog = {
		title: 'tests tests tests',
		author: 'Ronaldo',
		url: 'http://blog.cleancoder.com/',
		likes: 45
	}
	const responseAfterUpdateUpdate = await api.put(`/api/blogs/${responseBefereUpdate.body.id}`).send(updatedBlog).set({ 'Authorization': `Bearer ${loginInfo.body.token}` })
	expect(responseAfterUpdateUpdate.body.author).toBe(updatedBlog.author)

}, 100000)

afterAll(() => {
	mongoose.connection.close()
})