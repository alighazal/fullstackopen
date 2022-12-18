import { createSlice } from "@reduxjs/toolkit"

const initialState = {"message": "", timeoutID: -1 } 

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNewNotification(state, action) {
      const {message, timeoutID} = action.payload
      state.message = message
      state.timeoutID = timeoutID
    },
    hideNotification(state, action) {
      state.message = ''
    }
  },
})

export const setNotification = (message, time) => {
  return async (dispatch, getState) => {
    const lastTimeoutId = getState( )
    if ( lastTimeoutId.notification.timeoutID !== -1 ) clearTimeout( lastTimeoutId.notification.timeoutID  )
    const timeoutId = setTimeout(() => {
      dispatch( hideNotification() )
    }, time * 1000)
    console.log( lastTimeoutId.notification.timeoutID , timeoutId)
    dispatch( createNewNotification( {"message": message, timeoutID: timeoutId }    ) )
    
  }
}

export const { createNewNotification, hideNotification } = notificationReducer.actions
export default notificationReducer.reducer