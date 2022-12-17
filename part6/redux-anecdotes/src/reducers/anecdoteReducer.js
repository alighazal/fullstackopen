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
    updateAnecdotetAction(state, action) {
      const anecdote = action.payload
      const newState = state.map( item => (item.id === anecdote.id)? anecdote : item )
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

export const createAnecdotes = content => {
  return async dispatch => {
    const newAnecdotes = await anecdoteService.createNew(content)
    dispatch(appendAnecdoteAction(newAnecdotes))
  }
}

export const updateAnecdotes = content => {
  return async dispatch => {
    const newAnecdotes = await anecdoteService.update(content)
    dispatch(updateAnecdotetAction(newAnecdotes))
  }
}



export const { updateAnecdotetAction, addNewAnecdoteAction, appendAnecdoteAction, setAnecdotesAction } = anecdoteReducer.actions
export default anecdoteReducer.reducer