import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { Navigate } from 'react-router-dom'
import {getUser, fetchUser} from '../state/slices/userSlice'


/**
 * Wrap this around any component. Behavior depends on unauthorized prop:
 *   true: children will be rendered if you are NOT logged in
 *   false: children will be rendered only if you ARE logged in
 */
const UserAuthWrapper = ({unauthorized, children}) => {
    // Checks if user is logged in already
    const user = useSelector(getUser)

    const renderChildren = unauthorized ? !(user.isLoggedIn) : user.isLoggedIn;


    return renderChildren ? (
        {...children}
    ) :(
        <Navigate to="/"/>
    )
}

export default UserAuthWrapper