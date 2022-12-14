import { useState } from "react"

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)

  return (
      showDetails?
        <div style = { blogStyle }>
          <p>Title: {blog.title}</p>
          <p>Author: {blog.author}</p>
          <p>URL: {blog.url}</p>
          <p>Likes: {blog.likes}</p>
          <button onClick={() => { setShowDetails(!showDetails) }}>{showDetails ? "hide" : "show"}</button>
        </div >:
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => { setShowDetails(!showDetails) }}>
          {showDetails ? "hide" : "show"}
        </button>
      </div>
  )
}

export default Blog