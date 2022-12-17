import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'


const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    increasVoteCountAction(state, action) {
      const id = action.payload
      const newState = state.map( item => (item.id === id)? {...item, votes: item.votes + 1} : item  )
      return newState
    },
    addNewAnecdoteAction(state, action) {
      const content = action.payload
      state.push(asObject( content ))
    },
    appendAnecdoteAction(state, action) {
      state.push(action.payload)
    },
    setAnecdotesAction(state, action){
      return action.payload
    }
  },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotesAction(notes))
  }
}


export const { addNewAnecdoteAction, increasVoteCountAction, appendAnecdoteAction, setAnecdotesAction } = anecdoteReducer.actions
export default anecdoteReducer.reducer