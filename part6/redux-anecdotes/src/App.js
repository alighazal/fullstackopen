import { useSelector } from 'react-redux'
import AnecdotesForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'


const App = () => {
  const anecdotes = useSelector(state => state)

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList anecdotes={anecdotes} / >
      <h2>create new</h2>
      <AnecdotesForm />
      
    </div>
  )
}

export default App