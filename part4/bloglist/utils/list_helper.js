const blog = require("../models/blog")

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {

	const reducer = (sum, item) => {
		return sum + item['likes']
	}

	return blogs.length === 0
		? 0
		: blogs.reduce(reducer, 0)

}

const favoriteBlog = (blogs) => {
	let most_loved_blog = null
	for (let i = 0; i < blogs.length; i++) {
		if (!most_loved_blog) {
			most_loved_blog = blogs[i]
		} else {
			if (blogs[i].likes > most_loved_blog.likes) {
				most_loved_blog = blogs[i]
			}
		}
	}
	return most_loved_blog
}

const mostBlogs = (blogs) => {
	// return author who has the largest amount of blogs
	let authors_blogs_count = {}
	for (let i = 0; i < blogs.length; i++) {
		if (authors_blogs_count[blogs[i].author] === undefined)
			authors_blogs_count[blogs[i].author] = 1
		else
			authors_blogs_count[blogs[i].author] += 1
	}
	let max_count = -1
	let max_count_author = null
	for (var author in authors_blogs_count) {
		if (authors_blogs_count[author] > max_count) {
			max_count = authors_blogs_count[author]
			max_count_author = author
		}
	}
	return max_count_author !== null ? {
		author: max_count_author,
		blogs: authors_blogs_count[max_count_author]
	}: null
}


const mostLikes = (blogs) => {
	// return author who has the largest amount of blogs
	let author_like_count = {}
	for (let i = 0; i < blogs.length; i++) {
		if (author_like_count[blogs[i].author] === undefined)
			author_like_count[blogs[i].author] = blogs[i].likes
		else
			author_like_count[blogs[i].author] += blogs[i].likes
	}
	let max_count = -1
	let max_count_author = null
	for (var author in author_like_count) {
		if (author_like_count[author] > max_count) {
			max_count = author_like_count[author]
			max_count_author = author
		}
	}
	return max_count_author !== null ? {
		author: max_count_author,
		likes: author_like_count[max_count_author]
	}: null
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}