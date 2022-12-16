import { useDispatch } from "react-redux"
import { addNewAnecdoteAction } from "../reducers/anecdoteReducer"

const AnecdotesForm = ()  => {

    const dispatch = useDispatch()

    const addNewAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch( addNewAnecdoteAction(content) )
        event.target.anecdote.value = ''
      }

    return (
        <form onSubmit={addNewAnecdote}>
            <div> <input name="anecdote" /></div>
            <button type='submit'>create</button>
        </form>
    )
}

export default AnecdotesForm