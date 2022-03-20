import { createSlice } from '@reduxjs/toolkit'

export const userSlice= createSlice({
  name: 'user',
  initialState: {
      user:null,
      documents: []
  },
  reducers: {
    signup: (state, action) => {
      state = action.payload
    },
    login: (state, action) => {
        state = action.payload    },
    logout: (state) => {
      state = null
    },
  },
})

export const { signup, login, logout } = userSlice.actions

export default userSlice.reducer