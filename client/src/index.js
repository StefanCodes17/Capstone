import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import HomePage from './pages/Home';

import './assets/main.css'
import Signup from './pages/Signup';
import Login from './pages/LogIn'
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>}></Route>
            </Routes>
        </Router>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'))