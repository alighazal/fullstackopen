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

export const { createNewNotification, hideNotification } = notificationReducer.actions
export default notificationReducer.reducer