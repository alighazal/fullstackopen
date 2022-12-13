const dummy = (blogs) => {
	return 1
}

const totalLikes  = (blogs) => {

	const reducer = (sum, item) => {
		return sum + item['likes']
	}

	return blogs.length === 0
		? 0
		: blogs.reduce(reducer, 0)

}


const favoriteBlog  = (blogs) => {
	let most_loved_blog = null
	for (let i = 0; i < blogs.length; i++){
		if (! most_loved_blog ){
			most_loved_blog = blogs[i]
		}else{
			if ( blogs[i].likes > most_loved_blog.likes ){
				most_loved_blog = blogs[i]
			}
		}
	}
	return most_loved_blog
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}