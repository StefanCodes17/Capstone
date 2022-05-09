import React from 'react'
import {useSelector} from "react-redux"
import { Navigate } from 'react-router-dom'
import {getUser} from '../state/slices/userSlice'


/**
 * Wrap this around any component. Behavior depends on unauthorized prop:
 *   true: children will be rendered if you are NOT logged in
 *   false: children will be rendered only if you ARE logged in
 */
const UserAuthWrapper = ({unauthorized, children}) => {
    const user = useSelector(getUser)

    const renderChildren = unauthorized ? !(user.isLoggedIn) : user.isLoggedIn;

    return renderChildren ? (
        {...children}
    ) :(
        <Navigate to="/"/>
    )
}

export default UserAuthWrapper