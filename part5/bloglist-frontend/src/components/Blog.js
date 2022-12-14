import { useState } from "react"
import blogService from '../services/blogs'


const Blog = (props) => {

  const [blog, setBlog] = useState(props.blog)

  const removeBlog = (id) => {
    blogService
      .deleteObject(id)
      .then(returnedBlog => {
        const newBlogsList = props.blogs.filter( (blog) => blog.id !== id  )
        props.setBlogs( newBlogsList )
      }).catch(error => {
        console.log(error.message)
      })
  }
  
  const incrementLikes = () => {
    let updatedBlog = {
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    blogService
      .update(updatedBlog)
      .then(returnedBlog => {
        setBlog( {...blog, likes: returnedBlog.likes} )
      }).catch(error => {
        console.log(error.message)
      })
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)

  return (
    showDetails ?
      <div style={blogStyle}>
        <p>Title: {blog.title}</p>
        <p>Author: {blog.author}</p>
        <p>URL: {blog.url}</p>
        <p>Likes: {blog.likes}  <button onClick={incrementLikes}>like</button> </p>
        <button onClick={() => {removeBlog(blog.id)}}>remove</button>
        <button onClick={() => { setShowDetails(!showDetails) }}>{showDetails ? "hide" : "show"}</button>
      </div > :
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => { setShowDetails(!showDetails) }}>
          {showDetails ? "hide" : "show"}
        </button>
      </div>
  )
}

export default Blog