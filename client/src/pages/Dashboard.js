import React from 'react'
import {useSelector} from "react-redux"
import Navbar from '../components/Navbar'
import {getUser} from '../state/slices/userSlice'
import { Navigate, Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  const user = useSelector(getUser)
  console.log(user)
  return (
    <div>  
      <Navbar/>
      <Sidebar />
      {/* Hello, {user?.username} */}
      {/* <Link to="/editor" >
						<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Editor</button>
			</Link> */}

    </div>
  )
}

export default Dashboard
