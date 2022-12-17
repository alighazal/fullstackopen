

import { useDispatch } from 'react-redux'
import { createNewNotification, hideNotification } from '../reducers/notificationReducer'
import { updateAnecdotes } from "../reducers/anecdoteReducer"


const AnecdoteList = ({anecdotes}) => {
   
    const dispatch = useDispatch()

    const increasVoteCount = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch( updateAnecdotes({...anecdote, votes: anecdote.votes + 1}) )
        dispatch( createNewNotification( ` vote with id ${anecdote.id} was up voted ` ) )
        setTimeout(() => {
            dispatch( hideNotification() )
          }, 5000)
    }
    return (
    anecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => increasVoteCount(anecdote)}>vote</button>
            </div>
        </div>
        )
    )
}

export default AnecdoteList