import { createSlice } from '@reduxjs/toolkit'

export const userSlice= createSlice({
  name: 'user',
  initialState: {
      user:null,
      documents: []
  },
  reducers: {
    signup: (state, action) => {
      state.user = action.payload
   },
    signin: (state, action) => {
        state.user = action.payload    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { signup, signin, logout } = userSlice.actions
export const getUser = (state) => state.user.user

export default userSlice.reducer