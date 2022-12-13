const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
	await User.deleteMany({})
}, 100000 )

test('can create a user', async () => {
	const newUser = {
		'username': 'a22343li',
		'name': 'koko',
		'password': 'toto'
	}

	await api.post('/api/users').send(newUser)

	const response = await api.get('/api/users')
	expect(response.body).toHaveLength(1)
}, 100000)


test('can\'t create a user without username', async () => {
	const newUser = {
		'name': 'koko',
		'password': 'toto'
	}
	await api.post('/api/users').send(newUser).expect(400)
}, 100000)


test('can\'t create a user without username', async () => {
	const newUser = {
		'username': 'a22343li',
		'name': 'koko',
	}
	await api.post('/api/users').send(newUser).expect(400)
}, 100000)




afterAll(() => {
	mongoose.connection.close()
})