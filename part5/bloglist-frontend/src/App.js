import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)


	useEffect(() => {
		blogService.getAll(user).then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
		if (loggedUserJSON) {
		  const user = JSON.parse(loggedUserJSON)
		  setUser(user)
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
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
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

	return (
		<div>
			<h2>blogs</h2>
			{user === null ?
				loginForm() :
				<div>
					<p>
						{user.name} logged-in
						<button  onClick={()=>{
							setUser(null)
							window.localStorage.removeItem('loggedUser')
						}} >log out</button>
					</p>
					{blogs.map(blog =>
						<Blog key={blog.id} blog={blog} />
					)}
				</div>
			}
		</div>
	)
}

export default App
