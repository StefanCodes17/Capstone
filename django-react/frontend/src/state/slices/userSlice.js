import { createSlice } from '@reduxjs/toolkit'

export const userSlice= createSlice({
  name: 'user',
  initialState: {
      user:null,
      documents: [
        {
          id :"",
          user_id: "",
          date_created:"",
          date_modified:"",
          title: "root",
          content:"",
          folder_id:"",
          expanded : true,
          children:[
          {
              title:"first", 
              id:1
          }
          ,{
              title:"second", 
              id:2
          }, 
          {
              title:"third",
              id:3,
              expanded:false,
              children:[
                  {
                      title:"fourth",
                      id:4
                  },
                  {
                      title:"fifth",
                      id:5,
                      expanded:false,
                      children:[
                          
                      ]
                  }   
              ]
          } 
        ]
      }
      ]
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
    toggleFolder : (state, action)=>{
      state.documents = action.payload
    },
  },
})

export const { signup, signin, logout } = userSlice.actions
export const getUser = (state) => state.user.user

export default userSlice.reducer
