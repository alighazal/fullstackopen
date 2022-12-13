const User = require('./models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
	// code that extracts the token

	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer '))
		request['token'] = authorization.substring(7) || null

	next()
}

const userExtractor = async (request, response, next) => {
	// code that extracts the token
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id)

	request['user'] = user
	next()
}

module.exports = {
	tokenExtractor,
	userExtractor
}