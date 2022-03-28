import React from 'react'
import {useSelector} from "react-redux"
import Navbar from '../components/Navbar'
import {getUser} from '../state/slices/userSlice'
import { Navigate, Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <div>  
      <Navbar/>
      <Sidebar />
    </div>
  )
}

export default Dashboard
