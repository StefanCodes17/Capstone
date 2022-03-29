import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import HomePage from './pages/Home';

import './assets/main.css'
import Signup from './pages/Signup';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DocEditor from './components/DocEditor'

import {Provider} from "react-redux"
import store from "./state/app/store"
import UserAuthWrapper from './wrappers/UserAuthWrapper'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="signup" element={<Signup/>}/> 
                <Route path="login" element={<Login/>}/>
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
                <Route path="*" element={<Navigate to="/"/>}></Route>
            </Routes>
        </Router>
    );
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
, document.getElementById('root'))