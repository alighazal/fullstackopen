const tokenExtractor = (request, response, next) => {
	// code that extracts the token

	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer '))
		request['token'] = authorization.substring(7) || null

	next()
}

module.exports = {
	tokenExtractor
}