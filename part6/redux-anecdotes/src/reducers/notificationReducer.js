import { createSlice } from "@reduxjs/toolkit"

const initialState = {"message": "hello world"} 

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
})

export default notificationReducer.reducer