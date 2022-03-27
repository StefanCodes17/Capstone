import React from 'react'
import {useSelector} from "react-redux"
import { Navigate } from 'react-router-dom'
import {getUser} from '../state/slices/userSlice'


const UserAuthWrapper = ({children}) => {
    const user = useSelector(getUser)

    return true ? (
        {...children}
    ) :(
        <Navigate to="/"/>
    )
}

export default UserAuthWrapper