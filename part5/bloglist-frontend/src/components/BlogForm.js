import { useState } from 'react'

const BlogForm = ({  addBlog }) => {

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  return (
    <form data-testid="blog-form"  onSubmit={() => addBlog(newBlog)}>
      <div>
      title
        <input
          type="text"
          value={newBlog.title}
          name="title"
          placeholder='write here blog title'
          onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
        />
      </div>
      <div>
      author
        <input
          type="text"
          value={newBlog.author}
          name="author"
          placeholder='write here blog author'
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
        />
      </div>
      <div>
      url
        <input
          type="text"
          value={newBlog.url}
          name="URL"
          placeholder='write here blog URL'
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
        />
      </div>
      <button type="submit">save</button>
    </form>
  )

}

export default BlogForm
