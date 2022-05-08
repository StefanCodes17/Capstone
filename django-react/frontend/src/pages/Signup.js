import React, {useState} from 'react'
import {Link } from 'react-router-dom'
import {useDispatch} from "react-redux" 
import {signup, getUser} from "../state/slices/userSlice"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useSelector } from 'react-redux';

const Signup = () => {
  const user = useSelector(getUser)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate();

  // if(user){
  //   navigate("/")
  // }

  const handleSubmit = (e) =>{
    e.preventDefault()

    // axios.post(`${process.env.REACT_APP_HOST}/api/users/register`, {username, email, password}, {
    //       headers:{
    //         'Content-Type': 'application/json'
    //       },
    //     }).then((res)=>{
    //       dispatch(signup({
    //         ...res.data,
    //         isLoggedIn: false
    //       }))
    //       navigate("/")
    //     })
    //     .catch(function (error) {
    //       if (error.response) {
    //         // Request made and server responded
    //         setError(true)
    //       } else if (error.request) {
    //         // The request was made but no response was received
    //         console.log("Error with connecting to server", error.request);
    //       } else {
    //         // Something happened in setting up the request that triggered an Error
    //         console.log('Error', error.message);
    //       }
    //     });
  }


  return (
    <div className="relative max-w-4xl m-auto">
        <div className="px-5 py-5 m-auto max-w-sm">
          <Link to="/">
            <div className="flex items-center py-2 px-4 absolute top-5 left-5 m-auto cursor-pointer">
              LifePad
            </div>
          </Link>
          <div className=" px-8 py-10 mt-5">
            <h1 className="font-semibold font-sans text-xl">Create an Account</h1>
            <form 
            onSubmit={handleSubmit}
            className="flex flex-col mt-6 max-w-xs m-auto"
            >
              {/*Email Field */}
              <label htmlFor="email" className="font-semibold text-sm mb-2">
                  Email address
                </label>
              <div className={`justify-center opacity-40 flex border border-gray-300 rounded focus:shadow items-center`} >
               <input 
                required
                value={email} 
                onChange={(e) => {setEmail(e.target.value); error && setError(false)}} 
                type="email" 
                id="email" 
                name="email"
                className="flex-grow focus:outline-none px-2 py-1 mt-1 w-full"  />
              </div>
              {/*Username Field */}
              <label htmlFor="email" className="font-semibold text-sm mb-2">
                  Username
                </label>
              <div className={`justify-center opacity-40 flex border border-gray-300 rounded focus:shadow items-center`} >
               <input 
                required
                value={username} 
                onChange={(e) => {setUsername(e.target.value); error && setError(false)}} 
                type="text" 
                id="username" 
                name="username"
                className="flex-grow focus:outline-none px-2 py-1 mt-1 w-full"  />
              </div>
              {/*Password Field */}
              <label htmlFor="email" className="font-semibold text-sm mb-2">
                  Password
                </label>
              <div className={`justify-center opacity-40 flex border border-gray-300 rounded focus:shadow items-center`} >
               <input 
                required
                value={password} 
                onChange={(e) => {setPassword(e.target.value); error && setError(false)}} 
                type="password" 
                id="password" 
                name="password"
                className="flex-grow focus:outline-none px-2 py-1 mt-1 w-full"  />
              </div>
              
              <button type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2">Sign In</button>
            </form>
            {error && (
            <div className="bg-red-100 border-t-4 mt-3 border-red-600 rounded-b text-red-900 px-4 py-3 shadow-md" role="alert">
              <div className="flex">
                <div className="py-1"><svg className="fill-current h-6 w-6 text-red-600 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                <div>
                  <p className="font-bold">Error</p>
                  <p className="text-sm">Incorrect credentials or email has not been verified</p>
                </div>
              </div>
            </div>
            )}
            <div className="w-full flex items-center justify-between">
                <hr className="mt-3 w-28"></hr> 
                <p className="text-sm pt-1 text-gray-500">or</p>
                <hr className="mt-3 w-28"></hr>
            </div>
            <Link to="/login">
              <div>
                <p 
                className="text-sm text-gray-800 hover:underline underline-offset-2 cursor-pointer"
                >Have an account? <span >Log in!</span></p>
              </div>
            </Link>
          </div>
      </div>
    </div>
  )
}

export default Signup