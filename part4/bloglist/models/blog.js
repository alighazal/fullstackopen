const mongoose = require('mongoose')
const config = require('../utils/config')


const url = config.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
	// eslint-disable-next-line no-unused-vars
	.then(result => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	author: String,
	likes: {
		type : Number,
		default: 0
	}
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Blog', blogSchema)