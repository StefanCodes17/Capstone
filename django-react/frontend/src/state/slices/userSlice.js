import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

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
        state.user = action.payload
        axios.post(`${process.env.REACT_APP_HOST}/api/users/token`, {email: action.payload.email, password: action.payload.password}, {
          headers:{
            'Content-Type': 'application/json'
          },
        }).then((res)=>{
          localStorage.setItem("access", res.data["access"])
          localStorage.setItem("refresh", res.data["refresh"])
        }).catch(function (error) {
          if (error.response) {
            console.log(error.response)
          } else if (error.request) {
            // The request was made but no response was received
            console.log("Error with connecting to server", error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
    },
    toggleFolder : (state, action)=>{
      state.documents = action.payload
    },
  },
})

export const { signup, signin, logout } = userSlice.actions
export const getUser = (state) => state.user.user

export default userSlice.reducer
