import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, blogs, setBlogs, incrementLikes }) => {
  const removeBlog = (id) => {
    blogService
      .deleteObject(id)
      .then(() => {
        const newBlogsList = blogs.filter( (blog) => blog.id !== id  )
        setBlogs( newBlogsList )
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
      <div className="blog" style={blogStyle}>
        <p>Title: <span>{blog.title}</span></p>
        <p>Author: <span>{blog.author}</span></p>
        <p>URL: <span>{blog.url}</span></p>
        <p>Likes: <span>{blog.likes}</span>  <button onClick={() => incrementLikes(blog)}> like </button> </p>
        <button onClick={() => {removeBlog(blog.id)}}>remove</button>
        <button onClick={() => { setShowDetails(!showDetails) }}>{showDetails ? 'hide' : 'show'}</button>
      </div > :
      <div className="blog" style={blogStyle}>
        <p>{ blog.title }  { blog.author }</p>
        <button onClick={() => { setShowDetails(!showDetails) }}>
          {showDetails ? 'hide' : 'show'}
        </button>
      </div>
  )
}

export default Blog