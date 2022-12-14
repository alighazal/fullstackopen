import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => {
	if (message === null) {
		return null
	}

	return (
		<div className={message.status}>
			{message.content}
		</div>
	)
}

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" })
	const [message, setMessage] = useState(null)

	useEffect(() => {
		blogService.getAll(user).then(blogs =>
			setBlogs(blogs)
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
				"content": 'logged in :)'
			})
			setTimeout(() => {
				setMessage(null)
			}, 5000)

			setUsername('')
			setPassword('')
		} catch (exception) {
			setMessage({
				'status': 'error',
				"content": 'Wrong credentials'
			})
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const addBlog = (event) => {
		event.preventDefault()
		blogService
			.create(newBlog)
			.then(returnedBlog => {
				setBlogs(blogs.concat(returnedBlog))
				setMessage({
					'status': 'success',
					"content": `a new blog "${returnedBlog.title}" was added `
				})
				setTimeout(() => {
					setMessage(null)
				}, 5000)
				setNewBlog({ title: "", author: "", url: "" })
			}).catch( error => {
				setMessage({
					'status': 'error',
					"content": error.message
				})
				setTimeout(() => {
					setMessage(null)
				}, 5000)
			} )
	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	)

	const blogForm = () => (
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

	return (
		<div>



			<h2>blogs</h2>
			<Notification message={message} />
			{user === null ?
				loginForm() :
				<div>
					<p>
						{user.name} logged-in
						<button onClick={() => {
							setUser(null)
							window.localStorage.removeItem('loggedUser')
						}} >log out</button>
					</p>

					<br />
					{blogForm()}
					<br />

					{
						blogs.map(blog =>
							<Blog key={blog.id} blog={blog} />
						)
					}
				</div>
			}
		</div>
	)
}

export default App
