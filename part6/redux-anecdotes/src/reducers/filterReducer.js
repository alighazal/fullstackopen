import { createSlice } from "@reduxjs/toolkit"

const initialState = {"format": ""} 

const filterReducer = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    createNewFilter(state, action) {
      const content = action.payload
      state.format = content
    }
  },
})

export const { createNewFilter } = filterReducer.actions
export default filterReducer.reducer