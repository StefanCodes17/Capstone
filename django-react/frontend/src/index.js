import ReactDOM from 'react-dom';
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import HomePage from './pages/Home';

import './assets/main.css'
import Signup from './pages/Signup';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DocEditor from './components/DocEditor'
import NewDoc from './pages/NewDoc'

import {Provider} from "react-redux"
import store from "./state/app/store"
import UserAuthWrapper from './wrappers/UserAuthWrapper'
import {useDispatch, useSelector} from "react-redux" 
import {signin, getUser, fetchUser} from "../src/state/slices/userSlice"
import api from '../config'

const App = () => {
    // Checks if user is logged in already
    const user = useSelector(getUser)
    const dispatch = useDispatch()
    // If session hasn't expired yet, but the tab is being reopened, then try
    // to reload the User model from the server. If you were never logged in or
    // session expired, then this does nothing
    useEffect(()=>{
        if(!user.isLoggedIn){
            dispatch(fetchUser());
        }
    }, [])


    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="signup" element={
                    <UserAuthWrapper unauthorized={true}><Signup/></UserAuthWrapper>
                }/>
                <Route path="login" element={
                    <UserAuthWrapper unauthorized={true}><Login/></UserAuthWrapper>
                } />
                <Route path="dashboard" element={
                    <UserAuthWrapper>
                        <Dashboard/>
                    </UserAuthWrapper>
                    } />
                    <Route path="editor" element={
                    <UserAuthWrapper>
                        <DocEditor/>
                    </UserAuthWrapper>
                } />
                <Route path="new-doc" element={
                    <UserAuthWrapper>
                        <NewDoc />
                    </UserAuthWrapper>
                } />
                <Route path="/doc/:id" element={
                    <UserAuthWrapper>
                        <Dashboard />
                    </UserAuthWrapper>
                } />
                <Route path="*" element={<Navigate to="/"/>} />
            </Routes>
        </Router>
    );
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
, document.getElementById('root'))