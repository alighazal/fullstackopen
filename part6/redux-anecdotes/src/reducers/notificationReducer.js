import { createSlice } from "@reduxjs/toolkit"

const initialState = {"message": ""} 

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNewNotification(state, action) {
      const content = action.payload
      state.message = content
    },
    hideNotification(state, action) {
      state.message = ''
    }
  },
})

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch( createNewNotification(message ) )
    setTimeout(() => {
          dispatch( hideNotification() )
      }, time * 1000)
  }
}

export const { createNewNotification, hideNotification } = notificationReducer.actions
export default notificationReducer.reducer