import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Notification from './components/Notication'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort( (a,b) => b.likes - a.likes ))
    )
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setMessage({
        'status': 'success',
        'content': 'logged in :)'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({
        'status': 'error',
        'content': 'Wrong credentials'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = (newBlog) => {
    event.preventDefault()
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage({
          'status': 'success',
          'content': `a new blog "${returnedBlog.title}" was added`
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }).catch(error => {
        setMessage({
          'status': 'error',
          'content': error.message
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const incrementLikes = (blog) => {
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
        const blogsUpdated = blogs.map( _blog => ( _blog.id === blog.id  )? { ...blog, likes: returnedBlog.likes }: _blog  )
        setBlogs( blogsUpdated  )
        // setBlog(  )
      }).catch(error => {
        console.log(error.message)
      })
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user === null ?
        <Login 	handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword} /> :
        <div>
          <p>
            {user.name} logged-in
            <button onClick={() => {setUser(null); window.localStorage.removeItem('loggedUser')}} >log out</button>
          </p>

          <br />
          <Togglable  buttonLabel="New Blog" >
            <BlogForm addBlog={addBlog}  />
          </Togglable>
          <br />

          {
            blogs.map(blog => <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} incrementLikes={incrementLikes} />)
          }
        </div>
      }
    </div>
  )
}

export default App
