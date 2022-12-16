

import { useDispatch } from 'react-redux'
import { increasVoteCountAction } from '../reducers/anecdoteReducer'

const AnecdoteList = ({anecdotes}) => {
   
    const dispatch = useDispatch()

    const increasVoteCount = (id) => {
        console.log('vote', id)
        dispatch( increasVoteCountAction(id) )
    }
    return (
    anecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => increasVoteCount(anecdote.id)}>vote</button>
            </div>
        </div>
        )
    )
}

export default AnecdoteList