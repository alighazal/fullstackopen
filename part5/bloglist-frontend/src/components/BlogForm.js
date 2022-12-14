const BlogForm = ({addBlog, newBlog, setNewBlog }) => (
    
    
    <form onSubmit={addBlog}>
        <div>
            title
            <input
                type="text"
                value={newBlog.title}
                name="Username"
                onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
            />
        </div>
        <div>
            author
            <input
                type="text"
                value={newBlog.author}
                name="Username"
                onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
            />
        </div>
        <div>
            url
            <input
                type="text"
                value={newBlog.url}
                name="Username"
                onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
            />
        </div>
        <button type="submit">save</button>
    </form>
)

export default BlogForm
